/* live relationship counter with calendar-accurate values and render updates */
const counterState = {
  timer: null,
  startDate: null,
};

function parseStartDate() {
  if (config.TEST_MODE) {
    return new Date(config.TEST_START_DATE);
  }

  return new Date(config.RELATIONSHIP_DATE);
}

function getElapsedParts(startDate, nowDate) {
  const start = new Date(startDate);
  const now = new Date(nowDate);
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  let hours = now.getHours() - start.getHours();
  let minutes = now.getMinutes() - start.getMinutes();
  let seconds = now.getSeconds() - start.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += previousMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    years: Math.max(years, 0),
    months: Math.max(months, 0),
    days: Math.max(days, 0),
    hours: Math.max(hours, 0),
    minutes: Math.max(minutes, 0),
    seconds: Math.max(seconds, 0),
  };
}

function formatValue(value) {
  return String(value).padStart(2, '0');
}

function buildCounterMarkup(parts) {
  return `
    <div class="counter-grid">
      <div class="counter-item">
        <span class="counter-value">${parts.years}</span>
        <span class="counter-label">Years</span>
      </div>
      <div class="counter-item">
        <span class="counter-value">${formatValue(parts.months)}</span>
        <span class="counter-label">Months</span>
      </div>
      <div class="counter-item">
        <span class="counter-value">${formatValue(parts.days)}</span>
        <span class="counter-label">Days</span>
      </div>
      <div class="counter-item">
        <span class="counter-value">${formatValue(parts.hours)}</span>
        <span class="counter-label">Hours</span>
      </div>
      <div class="counter-item">
        <span class="counter-value">${formatValue(parts.minutes)}</span>
        <span class="counter-label">Minutes</span>
      </div>
      <div class="counter-item">
        <span class="counter-value">${formatValue(parts.seconds)}</span>
        <span class="counter-label">Seconds</span>
      </div>
    </div>
  `;
}

function updateCounter() {
  const now = new Date();
  const parts = getElapsedParts(counterState.startDate, now);
  const counterPanels = document.querySelectorAll('#finalCounter, #finalMemoryCounter');
  counterPanels.forEach((panel) => {
    panel.innerHTML = buildCounterMarkup(parts);
  });
}

function initializeCounter() {
  counterState.startDate = parseStartDate();
  updateCounter();
  counterState.timer = setInterval(updateCounter, 1000);
}

function RESET_COUNTER() {
  localStorage.removeItem('relationshipStart');
  location.reload();
}