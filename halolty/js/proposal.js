/* proposal interaction and celebration flow for YES action */
const proposalState = {
  accepted: false,
};

function setProposalMessage(message) {
  const celebrationText = document.getElementById('celebrationText');
  if (celebrationText) {
    celebrationText.textContent = message;
  }
}

function disableProposalButtons() {
  const buttons = document.querySelectorAll('#yesButton, #obviousButton');
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.cursor = 'default';
    button.style.opacity = '0.72';
  });
}

function saveRelationshipStart() {
  if (config.TEST_MODE) {
    return;
  }

  const currentTime = new Date().toISOString();
  localStorage.setItem('relationshipStart', currentTime);
}

function setProposalAccepted() {
  if (proposalState.accepted) return;
  proposalState.accepted = true;
  disableProposalButtons();
  saveRelationshipStart();
  setProposalMessage(contentData.proposal.yesMessage);
  createCelebrationEffects(document.body);
}

function attachProposalListeners() {
  const yesButton = document.getElementById('yesButton');
  const obviousButton = document.getElementById('obviousButton');
  if (!yesButton || !obviousButton) {
    return;
  }

  yesButton.addEventListener('click', setProposalAccepted);
  obviousButton.addEventListener('click', setProposalAccepted);
}

function skipToProposal() {
  const proposalScreen = getScreenElement('proposal');
  if (proposalScreen) {
    setActiveScreen('proposal');
  }
}