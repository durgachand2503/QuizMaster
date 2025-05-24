// Utility functions for the quiz app

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Get questions for a specific category
function getQuestionsByCategory(categoryId) {
  return questions.filter(q => q.category === categoryId);
}

// Filter questions by difficulty
function filterQuestionsByDifficulty(questions, difficulty) {
  return questions.filter(q => q.difficulty === difficulty);
}

// Get category by ID
function getCategoryById(categoryId) {
  return categories.find(c => c.id === categoryId);
}

// Get difficulty label
function getDifficultyLabel(difficulty) {
  const labels = {
    'easy': 'Easy',
    'medium': 'Medium',
    'hard': 'Hard'
  };
  return labels[difficulty] || 'Unknown';
}

// Calculate percentage score
function calculatePercentage(score, total) {
  return Math.round((score / total) * 100);
}

// Show screen with animation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    if (screen.classList.contains('active')) {
      screen.classList.add('screen-exit');
      setTimeout(() => {
        screen.classList.remove('active', 'screen-exit');
      }, 300);
    }
  });
  
  // Show target screen
  setTimeout(() => {
    const targetScreen = document.getElementById(screenId);
    targetScreen.classList.add('active', 'screen-enter');
    
    setTimeout(() => {
      targetScreen.classList.remove('screen-enter');
    }, 300);
  }, 300);
}

// Show modal
function showModal(modalId, content = '') {
  const modal = document.getElementById(modalId);
  
  if (modalId === 'explanation-modal' && content) {
    document.getElementById('explanation-text').textContent = content;
  }
  
  modal.style.display = 'flex';
  modal.classList.add('active');
  
  // Close modal when clicking on X or outside the modal
  modal.querySelector('.close-modal').onclick = () => closeModal(modalId);
  
  modal.onclick = (event) => {
    if (event.target === modal) {
      closeModal(modalId);
    }
  };
}

// Close modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('active');
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Set dynamic animation delay for elements
function setAnimationDelays(elements) {
  elements.forEach((el, index) => {
    el.style.setProperty('--index', index);
  });
}

// Create option element
function createOptionElement(option, index) {
  const optionElement = document.createElement('div');
  optionElement.className = 'option';
  optionElement.dataset.index = index;
  
  const label = document.createElement('div');
  label.className = 'option-label';
  
  const marker = document.createElement('div');
  marker.className = 'option-marker';
  marker.textContent = ['A', 'B', 'C', 'D'][index];
  
  const text = document.createElement('span');
  text.textContent = option;
  
  label.appendChild(marker);
  label.appendChild(text);
  optionElement.appendChild(label);
  
  return optionElement;
}

// Create category card element
function createCategoryCard(category) {
  const card = document.createElement('div');
  card.className = 'category-card';
  card.dataset.category = category.id;
  card.style.borderColor = category.color;
  
  const icon = document.createElement('div');
  icon.className = 'category-icon';
  icon.textContent = category.icon;
  icon.style.color = category.color;
  
  const name = document.createElement('h3');
  name.className = 'category-name';
  name.textContent = category.name;
  
  const description = document.createElement('p');
  description.className = 'category-description';
  description.textContent = category.description;
  
  card.appendChild(icon);
  card.appendChild(name);
  card.appendChild(description);
  
  return card;
}

// Create high score item element
function createHighScoreElement(score, index) {
  const category = getCategoryById(score.category);
  
  const item = document.createElement('div');
  item.className = 'high-score-item';
  
  const rank = document.createElement('span');
  rank.className = 'high-score-rank';
  rank.textContent = `${index + 1}.`;
  
  const info = document.createElement('span');
  info.className = 'high-score-info';
  info.textContent = `${category.name}: ${score.score}/${score.totalQuestions}`;
  
  const percentage = document.createElement('span');
  percentage.className = 'high-score-percentage';
  percentage.textContent = `${calculatePercentage(score.score, score.totalQuestions)}%`;
  
  item.appendChild(rank);
  item.appendChild(info);
  item.appendChild(percentage);
  
  return item;
}

// Create review item element
function createReviewItemElement(question, userAnswer, index) {
  const isCorrect = userAnswer === question.correctAnswer;
  
  const item = document.createElement('div');
  item.className = 'review-item';
  
  const questionText = document.createElement('div');
  questionText.className = 'review-question';
  questionText.textContent = `${index + 1}. ${question.question}`;
  
  const status = document.createElement('div');
  status.className = `review-status ${isCorrect ? 'correct' : 'incorrect'}`;
  status.textContent = isCorrect ? 'Correct' : 'Incorrect';
  
  const answer = document.createElement('div');
  answer.className = 'review-answer';
  
  if (isCorrect) {
    answer.textContent = `Your answer: ${question.options[userAnswer]}`;
  } else {
    answer.textContent = `Your answer: ${userAnswer !== null ? question.options[userAnswer] : 'No answer'} | Correct answer: ${question.options[question.correctAnswer]}`;
  }
  
  const explanation = document.createElement('div');
  explanation.className = 'show-explanation';
  explanation.textContent = 'Show explanation';
  explanation.addEventListener('click', () => {
    showModal('explanation-modal', question.explanation);
  });
  
  item.appendChild(questionText);
  item.appendChild(status);
  item.appendChild(answer);
  
  if (question.explanation) {
    item.appendChild(explanation);
  }
  
  return item;
}