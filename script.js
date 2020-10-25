const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Is Javascript used for the styling of the web page?',
    answers: [
      { text: 'No', correct: true },
      { text: 'Yes', correct: false }
    ]
  },
  {
    question: 'What is HTML?',
    answers: [
      { text: 'It is not that important.', correct: false },
      { text: 'Used in making chairs.', correct: false },
      { text: 'The standard markup language for Web pages.', correct: true },
      { text: 'Stands for, how to make language.', correct: false }
    ]
  },
  {
    question: 'What is CSS?',
    answers: [
      { text: 'Makes your website worse.', correct: false },
      { text: 'Describes how HTML elements are to be displayed on screen.', correct: true },
      { text: 'Something you install in your car.', correct: false },
      { text: 'I do not know.', correct: false }
    ]
  },
  {
    question: 'Is there more to programming than just HTML, CSS, and JavaScript?',
    answers: [
      { text: 'No.', correct: false },
      { text: 'Yes.', correct: true }
    ]
  }
]