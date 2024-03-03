const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const applyButton = document.getElementById('apply');
let timer = document.getElementById('timer');
let countdown;
let remainingTime = 0;

let workTimeInput = document.getElementById('work-time');
let breakTimeInput = document.getElementById('break-time');
let longBreakTimeInput = document.getElementById('long-break-time');
let longBreakIntervalInput = document.getElementById('long-break-interval');

let workTime = parseInt(workTimeInput.value);
let breakTime = parseInt(breakTimeInput.value);
let longBreakTime = parseInt(longBreakTimeInput.value);
let longBreakInterval = parseInt(longBreakIntervalInput.value);

timer.textContent = `${workTime}:00`;

applyButton.addEventListener('click', function () {
  workTime = parseInt(workTimeInput.value);
  breakTime = parseInt(breakTimeInput.value);
  longBreakTime = parseInt(longBreakTimeInput.value);
  longBreakInterval = parseInt(longBreakIntervalInput.value);
  timer.textContent = `${workTime}:00`;
});

let phase = 'Work';
let intervalCount = 0;
let phaseDisplay = document.createElement('p');
document.body.appendChild(phaseDisplay);
phaseDisplay.style.display = 'block';
let notificationSound = new Audio('notif/mixkit-clear-announce-tones-2861.wav');

function startTimer(duration, message) {
  let timeLeft = duration * 60;
  countdown = setInterval(function () {
    timeLeft--;
    remainingTime = timeLeft;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft === 0) {
      clearInterval(countdown);
      notificationSound.play('notif/mixkit-clear-announce-tones-2861.wav');
      alert(message);
      if (phase === 'Work') {
        intervalCount++;
        if (intervalCount === longBreakInterval) {
          phase = 'Long break';
          intervalCount = 0;
        } else {
          phase = 'Break';
        }
      } else {
        phase = 'Work';
      }
      phaseDisplay.textContent = `Current phase: ${phase}`;
    }
  }, 1000);
}

startButton.addEventListener('click', function () {
  if (phase === 'Work') {
    startTimer(workTime, 'Work phase done, time for a break!');
  } else if (phase === 'Break') {
    startTimer(breakTime, 'Break phase done, time for work!');
  } else {
    startTimer(longBreakTime, 'Long break phase done, time for work!');
  }
  phaseDisplay.textContent = `Current phase: ${phase}`;
});

pauseButton.addEventListener('click', function () {
  if (pauseButton.textContent === 'Pause') {
    clearInterval(countdown);
    pauseButton.textContent = 'Resume';
  } else {
    startTimer(Math.round(remainingTime / 60), 'Resuming...');
    pauseButton.textContent = 'Pause';
  }
});

resetButton.addEventListener('click', function () {
  clearInterval(countdown);
  timer.textContent = `${workTime}:00`;
  phase = 'Work';
  intervalCount = 0;
  phaseDisplay.textContent = `Current phase: ${phase}`;
  pauseButton.textContent = 'Pause';
});