import { Chart } from "@/components/ui/chart"
// Fitness Tools JavaScript
class FitnessTools {
  constructor() {
    this.timer = {
      startTime: null,
      elapsedTime: 0,
      isRunning: false,
      interval: null,
    }
    this.initializeTools()
  }

  initializeTools() {
    this.initializeBMICalculator()
    this.initializeBodyFatCalculator()
    this.initializeCalorieCalculator()
    this.initializeORMCalculator()
    this.initializeWorkoutTimer()
    this.initializeProgressTracker()
    this.initializeNutritionTools()
  }

  // BMI Calculator
  initializeBMICalculator() {
    const calculateBtn = document.getElementById("calculate-bmi")
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        const height = Number.parseFloat(document.getElementById("bmi-height").value)
        const weight = Number.parseFloat(document.getElementById("bmi-weight").value)

        if (height && weight && height > 0 && weight > 0) {
          const bmi = this.calculateBMI(height, weight)
          this.displayBMIResult(bmi)
        } else {
          this.showError("Please enter valid height and weight values")
        }
      })
    }
  }

  calculateBMI(height, weight) {
    const heightInMeters = height / 100
    return weight / (heightInMeters * heightInMeters)
  }

  displayBMIResult(bmi) {
    const bmiValue = document.getElementById("bmi-value-tool")
    const bmiCategory = document.getElementById("bmi-category-tool")
    const bmiResult = document.getElementById("bmi-result-tool")

    if (bmiValue && bmiCategory && bmiResult) {
      bmiValue.textContent = bmi.toFixed(1)

      let category, color
      if (bmi < 18.5) {
        category = "Underweight"
        color = "text-blue-600 dark:text-blue-400"
      } else if (bmi < 25) {
        category = "Normal Weight"
        color = "text-green-600 dark:text-green-400"
      } else if (bmi < 30) {
        category = "Overweight"
        color = "text-yellow-600 dark:text-yellow-400"
      } else {
        category = "Obese"
        color = "text-red-600 dark:text-red-400"
      }

      bmiCategory.textContent = category
      bmiCategory.className = `text-sm text-gray-600 dark:text-gray-300 ${color}`
      bmiResult.classList.remove("hidden")
    }
  }

  // Body Fat Calculator
  initializeBodyFatCalculator() {
    const calculateBtn = document.getElementById("calculate-bf")
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        const gender = document.getElementById("bf-gender").value
        const age = Number.parseFloat(document.getElementById("bf-age").value)
        const waist = Number.parseFloat(document.getElementById("bf-waist").value)

        if (age && waist && age > 0 && waist > 0) {
          const bodyFat = this.calculateBodyFat(gender, age, waist)
          this.displayBodyFatResult(bodyFat)
        } else {
          this.showError("Please enter valid age and waist measurements")
        }
      })
    }
  }

  calculateBodyFat(gender, age, waist) {
    // Simplified body fat calculation (US Navy method approximation)
    let bodyFat
    if (gender === "male") {
      bodyFat = waist * 1.082 + age * 0.13 - 98.42
    } else {
      bodyFat = waist * 1.48 + age * 0.16 - 87.02
    }
    return Math.max(bodyFat, 0)
  }

  displayBodyFatResult(bodyFat) {
    const bfValue = document.getElementById("bf-value-tool")
    const bfCategory = document.getElementById("bf-category-tool")
    const bfResult = document.getElementById("bf-result-tool")

    if (bfValue && bfCategory && bfResult) {
      bfValue.textContent = `${bodyFat.toFixed(1)}%`

      let category
      if (bodyFat < 10) {
        category = "Very Low"
      } else if (bodyFat < 20) {
        category = "Low"
      } else if (bodyFat < 25) {
        category = "Normal"
      } else {
        category = "High"
      }

      bfCategory.textContent = category
      bfResult.classList.remove("hidden")
    }
  }

  // Calorie Calculator
  initializeCalorieCalculator() {
    const calculateBtn = document.getElementById("calculate-calories")
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        // Get BMI values for calorie calculation
        const height = Number.parseFloat(document.getElementById("bmi-height").value)
        const weight = Number.parseFloat(document.getElementById("bmi-weight").value)
        const activity = Number.parseFloat(document.getElementById("cal-activity").value)
        const goal = Number.parseInt(document.getElementById("cal-goal").value)

        if (height && weight && height > 0 && weight > 0) {
          const calories = this.calculateCalories(height, weight, activity, goal)
          this.displayCalorieResult(calories)
        } else {
          this.showError("Please calculate BMI first or enter height and weight")
        }
      })
    }
  }

  calculateCalories(height, weight, activityLevel, goal) {
    // Using Mifflin-St Jeor Equation (assuming male, age 30 for simplification)
    const bmr = 10 * weight + 6.25 * height - 5 * 30 + 5
    const tdee = bmr * activityLevel
    return Math.round(tdee + goal)
  }

  displayCalorieResult(calories) {
    const calValue = document.getElementById("cal-value-tool")
    const calResult = document.getElementById("cal-result-tool")

    if (calValue && calResult) {
      calValue.textContent = calories.toLocaleString()
      calResult.classList.remove("hidden")
    }
  }

  // One Rep Max Calculator
  initializeORMCalculator() {
    const calculateBtn = document.getElementById("calculate-orm")
    if (calculateBtn) {
      calculateBtn.addEventListener("click", () => {
        const weight = Number.parseFloat(document.getElementById("orm-weight").value)
        const reps = Number.parseInt(document.getElementById("orm-reps").value)

        if (weight && reps && weight > 0 && reps > 0 && reps <= 15) {
          const orm = this.calculateOneRepMax(weight, reps)
          this.displayORMResult(orm)
        } else {
          this.showError("Please enter valid weight and reps (1-15)")
        }
      })
    }
  }

  calculateOneRepMax(weight, reps) {
    // Using Brzycki formula
    if (reps === 1) return weight
    return weight * (36 / (37 - reps))
  }

  displayORMResult(orm) {
    const ormValue = document.getElementById("orm-value-tool")
    const ormResult = document.getElementById("orm-result-tool")

    if (ormValue && ormResult) {
      ormValue.textContent = orm.toFixed(1)
      ormResult.classList.remove("hidden")
    }
  }

  // Workout Timer
  initializeWorkoutTimer() {
    const startBtn = document.getElementById("timer-start")
    const stopBtn = document.getElementById("timer-stop")
    const pauseBtn = document.getElementById("timer-pause")
    const resetBtn = document.getElementById("timer-reset")
    const quickTimers = document.querySelectorAll(".quick-timer")

    if (startBtn) {
      startBtn.addEventListener("click", () => this.startTimer())
      stopBtn.addEventListener("click", () => this.stopTimer())
      pauseBtn.addEventListener("click", () => this.pauseTimer())
      resetBtn.addEventListener("click", () => this.resetTimer())

      quickTimers.forEach((btn) => {
        btn.addEventListener("click", () => {
          const seconds = Number.parseInt(btn.dataset.seconds)
          this.setQuickTimer(seconds)
        })
      })
    }
  }

  startTimer() {
    if (!this.timer.isRunning) {
      this.timer.startTime = Date.now() - this.timer.elapsedTime
      this.timer.isRunning = true
      this.timer.interval = setInterval(() => this.updateTimerDisplay(), 100)

      document.getElementById("timer-start").innerHTML = '<i class="fas fa-play mr-2"></i>Running'
      document.getElementById("timer-start").disabled = true
    }
  }

  stopTimer() {
    this.timer.isRunning = false
    if (this.timer.interval) {
      clearInterval(this.timer.interval)
    }

    // Log workout if timer was running for more than 1 minute
    if (this.timer.elapsedTime > 60000) {
      const workoutDuration = Math.floor(this.timer.elapsedTime / 60000) // minutes
      const caloriesEstimate = workoutDuration * 5 // rough estimate
      storageManager.logWorkout({
        duration: workoutDuration,
        calories: caloriesEstimate,
        type: "timer_workout",
      })
    }

    this.resetTimer()
  }

  pauseTimer() {
    if (this.timer.isRunning) {
      this.timer.isRunning = false
      clearInterval(this.timer.interval)
      document.getElementById("timer-start").innerHTML = '<i class="fas fa-play mr-2"></i>Resume'
      document.getElementById("timer-start").disabled = false
    }
  }

  resetTimer() {
    this.timer.isRunning = false
    this.timer.elapsedTime = 0
    this.timer.startTime = null
    if (this.timer.interval) {
      clearInterval(this.timer.interval)
    }

    this.updateTimerDisplay()
    document.getElementById("timer-start").innerHTML = '<i class="fas fa-play mr-2"></i>Start'
    document.getElementById("timer-start").disabled = false
  }

  setQuickTimer(seconds) {
    this.resetTimer()
    this.timer.elapsedTime = 0
    this.timer.targetTime = seconds * 1000
    this.startTimer()

    // Auto-stop when target reached
    const checkTarget = () => {
      if (this.timer.elapsedTime >= this.timer.targetTime) {
        this.stopTimer()
        this.showNotification(`${seconds} second timer completed!`, "success")
        // Play sound notification if available
        this.playNotificationSound()
      } else if (this.timer.isRunning) {
        setTimeout(checkTarget, 100)
      }
    }
    checkTarget()
  }

  updateTimerDisplay() {
    if (this.timer.isRunning) {
      this.timer.elapsedTime = Date.now() - this.timer.startTime
    }

    const minutes = Math.floor(this.timer.elapsedTime / 60000)
    const seconds = Math.floor((this.timer.elapsedTime % 60000) / 1000)

    const display = document.getElementById("timer-display")
    if (display) {
      display.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }
  }

  playNotificationSound() {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  // Progress Tracker
  initializeProgressTracker() {
    const logWorkoutBtn = document.getElementById("log-workout")
    if (logWorkoutBtn) {
      logWorkoutBtn.addEventListener("click", () => {
        storageManager.logWorkout({ type: "manual_log", calories: 300 })
        this.updateProgressChart()
        this.updateProgressCounters()
        this.showNotification("Workout logged!", "success")
      })
    }
    this.initializeProgressChart()
    this.updateProgressCounters()
  }

  initializeProgressChart() {
    const canvas = document.getElementById("progress-chart")
    if (canvas && typeof Chart !== "undefined") {
      const ctx = canvas.getContext("2d")
      // Get real data from storage
      const progress = storageManager.getProgressData()
      const workouts = progress.workouts || []
      // Count workouts per day for the last 7 days
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      const today = new Date()
      const weekData = Array(7).fill(0)
      workouts.forEach(w => {
        const d = new Date(w.timestamp)
        const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24))
        if (diff < 7) {
          weekData[6 - diff]++
        }
      })
      this.progressChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: days.map((_, i) => days[(today.getDay() + i + 1) % 7]),
          datasets: [{
            label: "Workouts",
            data: weekData,
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 2,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true, max: Math.max(2, Math.max(...weekData) + 1) } },
          plugins: { legend: { display: false } },
        },
      })
    }
  }

  updateProgressChart() {
    if (this.progressChart) {
      const progress = storageManager.getProgressData()
      const workouts = progress.workouts || []
      const today = new Date()
      const weekData = Array(7).fill(0)
      workouts.forEach(w => {
        const d = new Date(w.timestamp)
        const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24))
        if (diff < 7) {
          weekData[6 - diff]++
        }
      })
      this.progressChart.data.datasets[0].data = weekData
      this.progressChart.options.scales.y.max = Math.max(2, Math.max(...weekData) + 1)
      this.progressChart.update()
    }
  }

  updateProgressCounters() {
    // Update workouts-this-week and total-workouts
    const progress = storageManager.getProgressData()
    const workouts = progress.workouts || []
    const today = new Date()
    let weekCount = 0
    workouts.forEach(w => {
      const d = new Date(w.timestamp)
      const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24))
      if (diff < 7) weekCount++
    })
    const workoutsThisWeek = document.getElementById("workouts-this-week")
    const totalWorkouts = document.getElementById("total-workouts")
    if (workoutsThisWeek) workoutsThisWeek.textContent = weekCount
    if (totalWorkouts) totalWorkouts.textContent = workouts.length
  }

  // Nutrition Tools
  initializeNutritionTools() {
    const addCaloriesBtn = document.getElementById("add-calories")
    if (addCaloriesBtn) {
      addCaloriesBtn.addEventListener("click", () => {
        this.showCalorieInput()
      })
    }
    // Modal event listeners
    const foodModal = document.getElementById("food-modal")
    const closeFoodModal = document.getElementById("close-food-modal")
    const addFoodBtn = document.getElementById("add-food-btn")
    if (closeFoodModal) {
      closeFoodModal.addEventListener("click", () => {
        foodModal.classList.add("hidden")
        document.body.style.overflow = "auto"
      })
    }
    if (foodModal) {
      foodModal.addEventListener("click", (e) => {
        if (e.target === foodModal) {
          foodModal.classList.add("hidden")
          document.body.style.overflow = "auto"
        }
      })
    }
    if (addFoodBtn) {
      addFoodBtn.addEventListener("click", () => {
        const foodName = document.getElementById("food-name").value.trim()
        const foodCalories = document.getElementById("food-calories").value.trim()
        if (!foodName || !foodCalories || isNaN(foodCalories) || Number(foodCalories) <= 0) {
          this.showError("Please enter a valid food name and calories.")
          return
        }
        const today = new Date().toISOString().slice(0, 10)
        let nutrition = storageManager.get("nutrition", {})
        if (!nutrition[today]) nutrition[today] = []
        nutrition[today].push({ food: foodName, calories: Number.parseInt(foodCalories) })
        storageManager.set("nutrition", nutrition)
        this.updateCalorieTracker()
        this.showNotification(`Added ${foodCalories} calories from ${foodName}`, "success")
        // Reset and close modal
        document.getElementById("food-name").value = ""
        document.getElementById("food-calories").value = ""
        foodModal.classList.add("hidden")
        document.body.style.overflow = "auto"
      })
    }
    this.updateCalorieTracker()
  }

  showCalorieInput() {
    // Open the modal instead of prompt
    const foodModal = document.getElementById("food-modal")
    if (foodModal) {
      foodModal.classList.remove("hidden")
      document.body.style.overflow = "hidden"
      // Focus the food name input
      setTimeout(() => {
        const foodNameInput = document.getElementById("food-name")
        if (foodNameInput) foodNameInput.focus()
      }, 100)
    }
  }

  // Utility Methods
  showError(message) {
    storageManager.showNotification(message, "error")
  }

  showNotification(message, type = "success") {
    storageManager.showNotification(message, type)
  }
}

// Initialize fitness tools when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new FitnessTools()
})
