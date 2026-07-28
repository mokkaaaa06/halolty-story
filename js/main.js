/* main page initialization, content rendering, and developer mode wiring */
const appState = {
  currentScreen: 'opening',
  storyIndex: 0,
  storyScreens: ['story-1', 'story-2', 'story-3'],
  storyTimeout: null,
  swipeStartY: null,
};

const screenOrder = ['opening', 'story', 'letter', 'proposal', 'celebration', 'counter', 'final'];

function getScreenElement(screenName) {
  return document.querySelector(`.screen[data-screen="${screenName}"]`);
}

function updateStoryScreen() {
  const storyTitle = document.getElementById('storyTitle');
  const storyCopy = document.getElementById('storyCopy');
  const storyChapterNumber = document.getElementById('storyChapterNumber');
  const story = contentData.story[appState.storyIndex];

  if (storyTitle) storyTitle.textContent = story.title;
  if (storyCopy) storyCopy.textContent = story.description;
  if (storyChapterNumber) storyChapterNumber.textContent = String(appState.storyIndex + 1);
}

function setActiveScreen(screenName) {
  const current = getScreenElement(appState.currentScreen);
  const next = getScreenElement(screenName);
  if (!next || appState.currentScreen === screenName) return;

  if (current) {
    current.classList.remove('active');
    current.classList.add('exiting');
    window.setTimeout(() => current.classList.remove('exiting'), 900);
  }

  next.classList.add('active');
  next.classList.add('entering');
  window.requestAnimationFrame(() => next.classList.remove('entering'));

  appState.currentScreen = screenName;
}

function nextScreen() {
  const currentIndex = screenOrder.indexOf(appState.currentScreen);
  if (currentIndex === -1 || currentIndex === screenOrder.length - 1) return;
  const nextScreenName = screenOrder[currentIndex + 1];
  setActiveScreen(nextScreenName);
}

function previousScreen() {
  const currentIndex = screenOrder.indexOf(appState.currentScreen);
  if (currentIndex <= 0) return;
  const previousScreenName = screenOrder[currentIndex - 1];
  setActiveScreen(previousScreenName);
}

function handleSwipeGesture(event) {
  if (event.touches.length !== 1) return;
  const touch = event.touches[0];
  appState.swipeStartY = touch.clientY;
}

function handleSwipeEnd(event) {
  if (!appState.swipeStartY || event.changedTouches.length !== 1) return;
  const touch = event.changedTouches[0];
  const deltaY = touch.clientY - appState.swipeStartY;
  if (Math.abs(deltaY) < 80) return;

  if (deltaY < 0) {
    nextScreen();
  } else {
    previousScreen();
  }

  appState.swipeStartY = null;
}

function applyContent() {
  const openingTitle = document.getElementById('openingTitle');
  const openingSubtitle = document.getElementById('openingSubtitle');
  const openingCopy = document.getElementById('openingCopy');
  const beginButton = document.getElementById('beginButton');
  const letterContent = document.getElementById('letterContent');
  const proposalTitle = document.getElementById('proposalTitle');
  const proposalCopy = document.getElementById('proposalCopy');
  const yesButton = document.getElementById('yesButton');
  const obviousButton = document.getElementById('obviousButton');
  const musicButton = document.getElementById('musicButton');
  const finalOverlayText = document.getElementById('finalOverlayText');

  if (openingTitle) openingTitle.textContent = contentData.opening.title;
  if (openingSubtitle) openingSubtitle.textContent = contentData.opening.subtitle;
  if (openingCopy) openingCopy.textContent = contentData.opening.prompt;
  if (beginButton) beginButton.textContent = contentData.opening.buttonText;
  if (letterContent) letterContent.innerHTML = contentData.letter.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');
  if (proposalTitle) proposalTitle.textContent = contentData.proposal.title;
  if (proposalCopy) proposalCopy.textContent = contentData.proposal.copy;
  if (yesButton) yesButton.textContent = contentData.proposal.buttonPrimary;
  if (obviousButton) obviousButton.textContent = contentData.proposal.buttonSecondary;
  if (musicButton) musicButton.textContent = contentData.opening.musicButton.play;
  if (finalOverlayText) finalOverlayText.textContent = contentData.finalMessage.overlay;

  updateStoryScreen();
}

function animateStoryChapter() {
  const storyScreen = getScreenElement('story');
  if (!storyScreen) return;
  storyScreen.classList.add('entering');
  window.requestAnimationFrame(() => storyScreen.classList.remove('entering'));
}

function attachChapterButtons() {
  const beginButton = document.getElementById('beginButton');
  const storyContinueButton = document.getElementById('storyContinueButton');
  const letterContinueButton = document.getElementById('letterContinueButton');
  const counterContinueButton = document.getElementById('counterContinueButton');

  if (beginButton) {
    beginButton.addEventListener('click', () => setActiveScreen('story'));
  }

  if (storyContinueButton) {
    storyContinueButton.addEventListener('click', () => {
      if (appState.storyIndex < contentData.story.length - 1) {
        appState.storyIndex += 1;
        updateStoryScreen();
        animateStoryChapter();
        return;
      }
      setActiveScreen('letter');
    });
  }

  if (letterContinueButton) {
    letterContinueButton.addEventListener('click', () => setActiveScreen('proposal'));
  }

  if (counterContinueButton) {
    counterContinueButton.addEventListener('click', () => setActiveScreen('final'));
  }
}

function attachProposalButtons() {
  const yesButton = document.getElementById('yesButton');
  const obviousButton = document.getElementById('obviousButton');

  function acceptProposal() {
    if (proposalState.accepted) return;
    proposalState.accepted = true;
    disableProposalButtons();
    saveRelationshipStart();
    setProposalMessage(contentData.proposal.yesMessage);
    createCelebrationEffects(document.body);
    window.setTimeout(() => {
      setActiveScreen('celebration');
      window.setTimeout(() => {
        setActiveScreen('counter');
      }, 2800);
    }, 1500);
  }

  if (yesButton) yesButton.addEventListener('click', acceptProposal);
  if (obviousButton) obviousButton.addEventListener('click', acceptProposal);
}

function attachMusicControl() {
  const musicButton = document.getElementById('musicButton');
  const audio = document.getElementById('proposalAudio');
  if (!musicButton || !audio) return;

  function updateMusicButton() {
    if (audio.paused || audio.ended) {
      musicButton.textContent = contentData.opening.musicButton.play;
      musicButton.classList.remove('playing');
    } else {
      musicButton.textContent = contentData.opening.musicButton.pause;
      musicButton.classList.add('playing');
    }
  }

  audio.addEventListener('play', updateMusicButton);
  audio.addEventListener('pause', updateMusicButton);
  audio.addEventListener('ended', updateMusicButton);

  musicButton.addEventListener('click', () => {
    if (audio.paused || audio.ended) {
      audio.play().catch(() => {
        musicButton.textContent = contentData.opening.musicButton.play;
      });
    } else {
      audio.pause();
    }
  });

  updateMusicButton();
}

function attachSwipeNavigation() {
  // No swipe-based page navigation: only continue buttons move between screens.
}

function attachDeveloperMode() {
  const devPanel = document.getElementById('devPanel');
  const toggleTestMode = document.getElementById('toggleTestMode');
  const resetCounter = document.getElementById('resetCounter');
  const skipToProposalButton = document.getElementById('skipProposal');
  const previewCelebrationButton = document.getElementById('previewCelebration');
  const previewCounterButton = document.getElementById('previewCounter');

  window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      if (devPanel) devPanel.hidden = !devPanel.hidden;
    }
  });

  if (toggleTestMode) {
    toggleTestMode.addEventListener('click', () => {
      config.TEST_MODE = !config.TEST_MODE;
      alert(`Test mode is now ${config.TEST_MODE ? 'enabled' : 'disabled'}. Reload to apply.`);
    });
  }
  if (resetCounter) {
    resetCounter.addEventListener('click', RESET_COUNTER);
  }
  if (skipToProposalButton) {
    skipToProposalButton.addEventListener('click', () => setActiveScreen('proposal'));
  }
  if (previewCelebrationButton) {
    previewCelebrationButton.addEventListener('click', () => setActiveScreen('celebration'));
  }
  if (previewCounterButton) {
    previewCounterButton.addEventListener('click', () => setActiveScreen('counter'));
  }
}

function initializePage() {
  applyContent();
  attachChapterButtons();
  attachProposalButtons();
  attachMusicControl();
  attachSwipeNavigation();
  attachDeveloperMode();
  initializeCounter();
}

window.addEventListener('DOMContentLoaded', initializePage);