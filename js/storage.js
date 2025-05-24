// Local Storage functionality for saving and retrieving quiz data
const STORAGE_KEYS = {
  HIGH_SCORES: 'quizmaster_high_scores',
  QUIZ_HISTORY: 'quizmaster_history',
  CURRENT_QUIZ: 'quizmaster_current'
};

// Save high score
function saveHighScore(category, score, totalQuestions, timeTaken) {
  const highScores = getHighScores();
  
  // Add new score
  highScores.push({
    category,
    score,
    totalQuestions,
    timeTaken,
    date: new Date().toISOString()
  });
  
  // Sort by score (descending) and limit to top 10 per category
  const sortedScores = highScores
    .sort((a, b) => {
      // First sort by score percentage
      const aPercent = a.score / a.totalQuestions;
      const bPercent = b.score / b.totalQuestions;
      
      if (bPercent !== aPercent) {
        return bPercent - aPercent;
      }
      
      // If scores are equal, sort by time (faster is better)
      return a.timeTaken - b.timeTaken;
    });
  
  // Get top 10 scores per category
  const topScores = {};
  
  categories.forEach(cat => {
    topScores[cat.id] = sortedScores
      .filter(score => score.category === cat.id)
      .slice(0, 10);
  });
  
  // Flatten back to array
  const finalScores = Object.values(topScores).flat();
  
  // Save to local storage
  localStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(finalScores));
  
  return finalScores;
}

// Get high scores
function getHighScores() {
  try {
    const scores = localStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
    return scores ? JSON.parse(scores) : [];
  } catch (error) {
    console.error('Error getting high scores:', error);
    return [];
  }
}

// Get high scores for a specific category
function getCategoryHighScores(categoryId) {
  const allScores = getHighScores();
  return allScores.filter(score => score.category === categoryId);
}

// Save current quiz state
function saveQuizState(state) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_QUIZ, JSON.stringify(state));
}

// Get current quiz state
function getQuizState() {
  try {
    const state = localStorage.getItem(STORAGE_KEYS.CURRENT_QUIZ);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error getting quiz state:', error);
    return null;
  }
}

// Clear current quiz state
function clearQuizState() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_QUIZ);
}

// Save quiz to history
function saveQuizToHistory(category, score, totalQuestions, answers, timeTaken) {
  try {
    const history = getQuizHistory();
    
    history.push({
      category,
      score,
      totalQuestions,
      answers, // Array of {questionId, selectedAnswer, correct}
      timeTaken,
      date: new Date().toISOString()
    });
    
    // Keep only the latest 20 quizzes
    const latestHistory = history.slice(-20);
    
    localStorage.setItem(STORAGE_KEYS.QUIZ_HISTORY, JSON.stringify(latestHistory));
  } catch (error) {
    console.error('Error saving quiz history:', error);
  }
}

// Get quiz history
function getQuizHistory() {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.QUIZ_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Error getting quiz history:', error);
    return [];
  }
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}