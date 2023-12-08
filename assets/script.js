var timerEl = document.querySelector('.time');
var startButton = document.querySelector('.startButton');
var quizSection = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var answersList = document.getElementById('answers');


startButton.addEventListener("click", startQuiz);

var timer;
var timerCount;
var questions = ["Question1", "Question2", "Question3", "Question4", "Question5"];
var currentQuestionIndex = 0;
var questions = [
  {
    question: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correctIndex: 0,
  },
  {
    question: "Question 2",
    answers: ["Answer 21", "Answer 22", "Answer 23", "Answer 24"],
    correctIndex: 0,
  },

];


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

function startQuiz() {
    startTimer();
    showQuestion();
    startButton.style.display = 'none';
    quizSection.style.display = 'block';
  }

  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersList.innerHTML = '';
  
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var answerItem = document.createElement('li');
      answerItem.textContent = currentQuestion.answers[i];
      answerItem.addEventListener('click', function (event) {
        checkAnswer(event.target.textContent);
      });
      answersList.appendChild(answerItem);
    }
  }
  
  function checkAnswer(selectedAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.answers[currentQuestion.correctIndex]) {
    } else {

      timerCount -= 8; 
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      clearInterval(timer);

    }
  }