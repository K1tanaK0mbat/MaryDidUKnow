var timerEl = document.querySelectorAll('.time');
var startButton = document.querySelector('.startButton');

startButton.addEventListener("click", startQuiz);
var timer;
var timerCount;
var questions = ["Question1", "Question2", "Question3", "Question4", "Question5"];

function startTimer() {
    timerCount = 75;
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
        }
    }, 1000);
}