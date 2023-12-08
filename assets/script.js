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
  
 // ... (previous code)

function checkAnswer(selectedAnswer) {
    var currentQuestion = questions[currentQuestionIndex];
    var correctAnswer = currentQuestion.answers[currentQuestion.correctIndex];
    var answerElements = document.querySelectorAll('#answers li');
  
    for (var i = 0; i < answerElements.length; i++) {
      // Check if the answer is correct
      if (currentQuestion.answers[i] === correctAnswer) {
        answerElements[i].classList.add('correct-answer');
      }
  
      // Check if the answer is selected
      if (currentQuestion.answers[i] === selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
          // Mark the selected answer as correct
          answerElements[i].classList.add('selected-correct');
          showFeedbackMessage('Correct!');
        } else {
          // Mark the selected answer as incorrect
          answerElements[i].classList.add('selected-incorrect');
          showFeedbackMessage('Wrong!');
          timerCount -= 10; // Subtract 10 seconds for incorrect answer
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
  