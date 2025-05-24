// Main quiz application logic
document.addEventListener('DOMContentLoaded', function() {
  // State variables
  let currentQuiz = {
    category: null,
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    answers: [], // Track all answers for review
    startTime: null,
    totalTime: 0
  };
  
  // DOM elements
  const categoriesGrid = document.getElementById('categories-grid');
  const highScoresList = document.getElementById('high-scores-list');
  const categoryName = document.getElementById('category-name');
  const questionCounter = document.getElementById('question-counter');
  const difficultyLevel = document.getElementById('difficulty-level');
  const progressBar = document.getElementById('progress-bar');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const nextBtn = document.getElementById('next-btn');
  const timerText = document.getElementById('timer-text');
  const timerProgress = document.getElementById('timer-progress');
  const scoreValue = document.getElementById('score-value');
  const scoreMax = document.getElementById('score-max');
  const correctAnswers = document.getElementById('correct-answers');
  const timeTaken = document.getElementById('time-taken');
  const questionsReview = document.getElementById('questions-review');
  const restartBtn = document.getElementById('restart-btn');
  const homeBtn = document.getElementById('home-btn');
  
  // Timer instance
  let timer = new QuizTimer(
    15, // Default duration
    (remaining) => {
      // On tick callback
      timerText.textContent = remaining;
      
      // Update timer circle
      const circumference = 2 * Math.PI * 45;
      const offset = circumference * (1 - remaining / timer.duration);
      timerProgress.style.strokeDashoffset = offset;
    },
    () => {
      // On complete callback
      handleTimeUp();
    }
  );
  
  // Initialize the app
  function init() {
    populateCategories();
    populateHighScores();
    setupEventListeners();
    
    // Check for saved quiz
    const savedQuiz = getQuizState();
    if (savedQuiz) {
      // Show resume option
      // This could be implemented as a modal or notification
    }
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Category selection
    categoriesGrid.addEventListener('click', (e) => {
      const categoryCard = e.target.closest('.category-card');
      if (categoryCard) {
        const categoryId = categoryCard.dataset.category;
        startQuiz(categoryId);
      }
    });
    
    // Option selection
    optionsContainer.addEventListener('click', (e) => {
      const option = e.target.closest('.option');
      if (option && !option.classList.contains('selected')) {
        const selectedIndex = parseInt(option.dataset.index);
        selectAnswer(selectedIndex);
        
        // Get current question
        const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
        const isCorrect = selectedIndex === question.correctAnswer;
        
        // Show feedback immediately
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.textContent = isCorrect ? 'Correct!' : 'Incorrect!';
        
        // Add feedback message to the option
        option.appendChild(feedbackElement);
        
        // Enable next button after selection
        nextBtn.disabled = false;
        
        // Stop the timer
        timer.stop();
      }
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
      if (currentQuiz.currentQuestionIndex < currentQuiz.questions.length - 1) {
        loadNextQuestion();
      } else {
        endQuiz();
      }
    });
    
    // Restart button
    restartBtn.addEventListener('click', () => {
      startQuiz(currentQuiz.category);
    });
    
    // Home button
    homeBtn.addEventListener('click', () => {
      showScreen('welcome-screen');
    });
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        closeModal(modal.id);
      });
    });
  }
  
  // Populate categories
  function populateCategories() {
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
      const card = createCategoryCard(category);
      categoriesGrid.appendChild(card);
    });
    
    // Apply animation delays
    setAnimationDelays(document.querySelectorAll('.category-card'));
  }
  
  // Populate high scores
  function populateHighScores() {
    highScoresList.innerHTML = '';
    
    const allScores = getHighScores();
    const topScores = allScores.slice(0, 5);
    
    if (topScores.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No high scores yet. Take a quiz to set a record!';
      highScoresList.appendChild(emptyMessage);
      return;
    }
    
    topScores.forEach((score, index) => {
      const scoreItem = createHighScoreElement(score, index);
      highScoresList.appendChild(scoreItem);
    });
  }
  
  // Start quiz
  function startQuiz(categoryId) {
    // Get category
    const category = getCategoryById(categoryId);
    if (!category) return;
    
    // Get questions for this category
    let categoryQuestions = getQuestionsByCategory(categoryId);
    
    // Shuffle and limit to 10 questions
    categoryQuestions = shuffleArray(categoryQuestions).slice(0, 10);
    
    // Initialize quiz state
    currentQuiz = {
      category: categoryId,
      questions: categoryQuestions,
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      answers: [],
      startTime: Date.now(),
      totalTime: 0
    };
    
    // Update UI
    categoryName.textContent = category.name;
    scoreMax.textContent = `/${categoryQuestions.length}`;
    
    // Show quiz screen
    showScreen('quiz-screen');
    
    // Load first question
    loadQuestion(0);
  }
  
  // Load question
  function loadQuestion(index) {
    const question = currentQuiz.questions[index];
    
    // Reset state for new question
    currentQuiz.selectedAnswer = null;
    nextBtn.disabled = true;
    
    // Update question counter
    questionCounter.textContent = `Question ${index + 1}/${currentQuiz.questions.length}`;
    
    // Update difficulty level
    difficultyLevel.textContent = getDifficultyLabel(question.difficulty);
    
    // Update progress bar
    const progress = ((index) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Create options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, i) => {
      const optionElement = createOptionElement(option, i);
      optionsContainer.appendChild(optionElement);
    });
    
    // Apply animation delays to options
    setAnimationDelays(document.querySelectorAll('.option'));
    
    // Start timer
    timer.reset(question.timeLimit);
    setTimeout(() => {
      timer.start();
    }, 500); // Small delay to allow animations to complete
  }
  
  // Select answer
  function selectAnswer(index) {
    currentQuiz.selectedAnswer = index;
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    const isCorrect = index === question.correctAnswer;
    
    // Update options UI
    const options = optionsContainer.querySelectorAll('.option');
    
    options.forEach((option, i) => {
      option.classList.remove('selected');
      
      if (i === index) {
        option.classList.add('selected');
        option.classList.add(isCorrect ? 'correct' : 'incorrect');
      }
      
      // Always show correct answer
      if (i === question.correctAnswer && i !== index) {
        option.classList.add('correct');
      }
    });
    
    if (isCorrect) {
      currentQuiz.score++;
    }
    
    // Track answer for review
    currentQuiz.answers.push({
      questionId: question.id,
      question: question,
      selectedAnswer: index,
      isCorrect
    });
  }
  
  // Handle time up
  function handleTimeUp() {
    const options = optionsContainer.querySelectorAll('.option');
    const question = currentQuiz.questions[currentQuiz.currentQuestionIndex];
    
    // Show correct answer
    options.forEach((option, i) => {
      if (i === question.correctAnswer) {
        option.classList.add('correct');
      }
    });
    
    // Track answer for review
    currentQuiz.answers.push({
      questionId: question.id,
      question: question,
      selectedAnswer: null,
      isCorrect: false
    });
    
    // Enable next button
    nextBtn.disabled = false;
  }
  
  // Load next question
  function loadNextQuestion() {
    currentQuiz.currentQuestionIndex++;
    loadQuestion(currentQuiz.currentQuestionIndex);
  }
  
  // End quiz
  function endQuiz() {
    // Calculate total time
    currentQuiz.totalTime = Math.floor((Date.now() - currentQuiz.startTime) / 1000);
    
    // Update results UI
    scoreValue.textContent = currentQuiz.score;
    correctAnswers.textContent = `${currentQuiz.score} / ${currentQuiz.questions.length}`;
    timeTaken.textContent = formatTime(currentQuiz.totalTime);
    
    // Set score circle progress
    const scorePercent = currentQuiz.score / currentQuiz.questions.length;
    const scoreProgress = document.getElementById('score-progress');
    const circumference = 2 * Math.PI * 45;
    scoreProgress.style.setProperty('--score-offset', circumference * (1 - scorePercent));
    
    // Populate questions review
    questionsReview.innerHTML = '';
    currentQuiz.answers.forEach((answer, index) => {
      const reviewItem = createReviewItemElement(
        answer.question,
        answer.selectedAnswer,
        index
      );
      questionsReview.appendChild(reviewItem);
    });
    
    // Apply animation delays to review items
    setAnimationDelays(document.querySelectorAll('.review-item'));
    
    // Save to high scores
    saveHighScore(
      currentQuiz.category,
      currentQuiz.score,
      currentQuiz.questions.length,
      currentQuiz.totalTime
    );
    
    // Save to history
    saveQuizToHistory(
      currentQuiz.category,
      currentQuiz.score,
      currentQuiz.questions.length,
      currentQuiz.answers,
      currentQuiz.totalTime
    );
    
    // Clear quiz state
    clearQuizState();
    
    // Show results screen
    showScreen('results-screen');
  }
  
  // Initialize the app
  init();
});