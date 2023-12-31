var timerEl = document.querySelector('.time');
var startButton = document.getElementById('startButton');
var quizSection = document.getElementById('quiz');
var questionEl = document.getElementById('question');
var answersList = document.getElementById('answers');
var homeEl = document.getElementById('homeButton');
var view = document.getElementById('viewScore');
var clearEl = document.getElementById('clearScore');
var questions = [
  {
    question: "Which is the correct way to declare a variable's value?",
    answers: ["let toy;", "var toy;", "let toy ='Gift';", "var toy= Gift"],
    correctIndex: 2,
  },
  {
    question: "What is a Boolean expression?",
    answers: ["A link", "An equation", "If/else statement", "True or false statement"],
    correctIndex: 3,
  },
  {
    question: "Which browser interaction requires a typed response from users?",
    answers: ["Modal", "Prompt", "Alert", "Confirm"],
    correctIndex: 1,
  },
  {
    question: "In this function, what kind of variable is being declared: function showCat () { let title = 'New Kittens'; alert(title); }",
    answers: ["Local", "Global", "Boolean", "Static"],
    correctIndex: 0,
  },
  {
    question: "Why are stict equalities better than regular equalities?",
    answers: ["They look nicer", "They're easier to write", "They check for exact equality and have less room for error ", "They convert and change values to match as much as possible"],
    correctIndex: 2,
  },
  {
    question: "Which do you use to fetch an element by its class name?",
    answers: ["document.querySelector()", "getElementbyID()", "getChildren()", "getParent()"],
    correctIndex: 0,
  },
  {
    question: "const Starts = 'Venus', 'Serena', 'Hercules', 'Casopia']; What is this an example of?",
    answers: ["string", "bolean", "function", "array"],
    correctIndex: 3,
  },
  {
    question: "A single execution of a while loop function is called ____",
    answers: ["switch", "iteration", "value", "output"],
    correctIndex: 1,
  }
];

startButton.addEventListener("click", startQuiz);

var timer;
var timerCount;
var currentQuestionIndex;


function startTimer() {
    timerCount = 75;
    timer = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;
        if (timerCount <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timer);
          
            showFinish(timerCount);
          }
        }, 1000);
      }

function startQuiz() {
  currentQuestionIndex = 0;
    document.getElementById('home').style.display = 'none';
    document.getElementById('scoreboard').style.display = 'none';
    quizSection.style.display = 'block';
    startTimer();
    setTimeout(function () {
     
      showQuestion();
    }, 500);
  };
  

  function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    questionEl.classList.add('question');
    questionEl.textContent = currentQuestion.question;
    answersList.innerHTML = '';
  
    for (var i = 0; i < currentQuestion.answers.length; i++) {
      var answerItem = document.createElement('li');
      answerItem.textContent = currentQuestion.answers[i];
      answerItem.classList.add('answers'); 
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
    feedbackElement.classList.add('feedback-message');
    document.getElementById('quiz').appendChild(feedbackElement);
    setTimeout(function () {
      feedbackElement.remove();
    }, 1000);
  }
  
  function showFinish(score) {
    quizSection.innerHTML = ''; 
  
    var FinishElement = document.createElement('div');
   FinishElement.innerHTML = `
      <h2>All done</h2>
      <h3>Your high score is: ${score}</h3>
      <p>Enter your name: <input type="text" id="nameInput"></p>
      <button class="Button" onclick="submitScore()">Enter</button>
    `;
  
    quizSection.appendChild(FinishElement);
    document.getElementById('time-block').style.display = 'none';
  }
  
  function submitScore() {
    var playerName = document.getElementById('nameInput').value;

    var saveScores = JSON.parse(localStorage.getItem('saveScores')) || [];
  

    saveScores.push({ name: playerName, score: timerCount });

    localStorage.setItem('saveScores', JSON.stringify(saveScores));
  

    Scoreboard();
  }
  
  function Scoreboard() {
    var scoreboardEl = document.getElementById('scoreboard');
    var scoreList = document.getElementById('scoreList');
    scoreList.innerHTML = ''; 
  
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('home').style.display = 'none';
    document.getElementById('time-block').style.display = 'none';
    
    var saveScores = JSON.parse(localStorage.getItem('saveScores')) || [];
  
    saveScores.forEach(function (entry, index) {
      var listItem = document.createElement('li');
      listItem.classList.add('scores');
      listItem.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
      scoreList.appendChild(listItem);
    });
  

    scoreboardEl.style.display = 'inline-block';
  }
  
  homeEl.addEventListener('click', goHome);

 function goHome () {
  clearInterval(timer); 
  timerCount = 0; 
  currentQuestionIndex = 0; 

  document.getElementById('scoreboard').style.display = 'none';
  document.getElementById('home').style.display = 'block'; 
  location.reload();
  
 };

view.addEventListener('click', ViewScores);

function ViewScores() {
  document.getElementById('scoreboard').style.display = 'block';
  document.getElementById('home').style.display = 'none';

  
  Scoreboard();
}

clearEl.addEventListener('click', clearScores);

function clearScores() {
  localStorage.removeItem('saveScores');
  Scoreboard();
}