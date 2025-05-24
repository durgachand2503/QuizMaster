// Timer functionality
class QuizTimer {
  constructor(duration, onTick, onComplete) {
    this.duration = duration;
    this.remaining = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
    this.timerId = null;
    this.startTime = null;
    this.isRunning = false;
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.startTime = Date.now();
    
    this.timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
      this.remaining = Math.max(0, this.duration - elapsed);
      
      // Update timer UI
      this.onTick(this.remaining);
      
      // Add warning class when timer is running low
      const timerProgress = document.getElementById('timer-progress');
      if (this.remaining <= 5 && timerProgress) {
        timerProgress.classList.add('warning');
      }
      
      // Timer complete
      if (this.remaining === 0) {
        this.stop();
        this.onComplete();
      }
    }, 100);
  }
  
  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.isRunning = false;
    }
  }
  
  reset(newDuration) {
    this.stop();
    this.duration = newDuration || this.duration;
    this.remaining = this.duration;
    
    // Reset timer UI
    this.onTick(this.remaining);
    
    const timerProgress = document.getElementById('timer-progress');
    if (timerProgress) {
      timerProgress.classList.remove('warning');
    }
  }
  
  // Update the timer progress circle
  updateTimerUI(timeRemaining) {
    const timerText = document.getElementById('timer-text');
    const timerProgress = document.getElementById('timer-progress');
    
    if (timerText && timerProgress) {
      timerText.textContent = timeRemaining;
      
      // Calculate the offset for the timer circle
      // Full circle circumference is 2πr = 2 * π * 45 ≈ 283
      const circumference = 2 * Math.PI * 45;
      const offset = circumference * (1 - timeRemaining / this.duration);
      timerProgress.style.strokeDashoffset = offset;
    }
  }
}

// Format time (for displaying time taken)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}