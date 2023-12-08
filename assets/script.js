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
    correctIndex: 2,
  },
  {
    question: "Question 2",
    answers: ["Answer 21", "Answer 22", "Answer 23", "Answer 24"],
    correctIndex: 3,
  },

];


function startTimer() {
    timerCount = 75;
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timer);
            // Quiz is finished due to time running out or all questions answered
            showAllDone(timerCount);
          }
        }, 1000);
      }

function startQuiz() {
    startTimer();
    startButton.style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('score').style.display = 'block'; // Show the score element
    quizSection.style.display = 'block';
    showQuestion();
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
    var correctAnswer = currentQuestion.answers[currentQuestion.correctIndex];
    var answerElements = document.querySelectorAll('#answers li');
  
    for (var i = 0; i < answerElements.length; i++) {

      if (currentQuestion.answers[i] === correctAnswer) {
        answerElements[i].classList.add('correct-answer');
      }

      if (currentQuestion.answers[i] === selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
          // Mark the selected answer as correct
          answerElements[i].classList.add('selected-correct');
          showFeedbackMessage('Correct!');
        } else {

          answerElements[i].classList.add('selected-incorrect');
          showFeedbackMessage('Wrong!');
          timerCount -= 10; 
        }
      }
    }
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      setTimeout(function () {
        resetAnswerStyles(answerElements);
        showQuestion();
      }, 1000); 
    } else {
      clearInterval(timer);
showFinish(timerCount);
    }
  }
  
  function resetAnswerStyles(answerElements) {
    answerElements.forEach(function (answerElement) {
      answerElement.classList.remove('correct-answer', 'selected-correct', 'selected-incorrect');
    });
  }
  
  function showFeedbackMessage(message) {
    var feedbackElement = document.createElement('p');
    feedbackElement.textContent = message;
    document.getElementById('quiz').appendChild(feedbackElement);
    setTimeout(function () {
      feedbackElement.remove();
    }, 1000);
  }
  
  function showFinish(score) {
    quizSection.innerHTML = ''; // 
  
    var FinishElement = document.createElement('div');
   FinishElement.innerHTML = `
      <h2>All done</h2>
      <h3>Your high score is: ${score}</h3>
      <p>Enter your name: <input type="text" id="nameInput"></p>
      <button onclick="submitScore()">Enter</button>
    `;
  
    quizSection.appendChild(FinishElement);
  }
  
  function submitScore() {
    var playerName = document.getElementById('nameInput').value;
  }