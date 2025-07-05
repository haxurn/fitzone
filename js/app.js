// Enhanced Main application JavaScript
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded - Initializing enhanced app...")

  // Theme toggle functionality - ENHANCED
  initializeTheme()

  // Mobile menu functionality
  initializeMobileMenu()

  // Smooth scrolling
  initializeSmoothScrolling()

  // Workout filters
  initializeWorkoutFilters()

  // Video modal functionality
  initializeVideoModal()

  // BMI Calculator
  initializeBMICalculator()

  // Scroll animations
  initializeScrollAnimations()

  // Enhanced interactions
  initializeEnhancedInteractions()

  // Motivation features
  initializeMotivationFeatures()

  // Progress tracking
  initializeProgressTracking()

  console.log("Enhanced app initialization complete")
})

function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const darkIcon = document.getElementById("theme-toggle-dark-icon")
  const lightIcon = document.getElementById("theme-toggle-light-icon")

  if (!themeToggle || !darkIcon || !lightIcon) {
    console.error("Theme toggle elements not found")
    return
  }

  const currentTheme = localStorage.getItem("theme") || "dark"
  console.log("Current theme:", currentTheme)

  function updateThemeIcons(isDark) {
    if (isDark) {
      darkIcon.classList.remove("hidden")
      lightIcon.classList.add("hidden")
    } else {
      darkIcon.classList.add("hidden")
      lightIcon.classList.remove("hidden")
    }
  }

  function setTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      updateThemeIcons(true)
    } else {
      document.documentElement.classList.remove("dark")
      updateThemeIcons(false)
    }
    localStorage.setItem("theme", theme)

    // Trigger theme change event for other components
    window.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme } }))
  }

  setTheme(currentTheme)

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "light" : "dark")
    console.log("Theme toggled to:", isDark ? "light" : "dark")
  })
}

function initializeMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (e) => {
      e.stopPropagation()
      mobileMenu.classList.toggle("hidden")
      console.log("Mobile menu toggled")

      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.style.opacity = "0"
        mobileMenu.style.transform = "translateY(-10px)"
        setTimeout(() => {
          mobileMenu.style.opacity = "1"
          mobileMenu.style.transform = "translateY(0)"
          mobileMenu.style.transition = "all 0.3s ease"
        }, 10)
      }
    })

    document.addEventListener("click", (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden")
      }
    })
  }
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const target = document.querySelector(targetId)

      if (target) {
        const headerOffset = 100
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        const mobileMenu = document.getElementById("mobile-menu")
        if (mobileMenu) {
          mobileMenu.classList.add("hidden")
        }

        console.log("Scrolled to:", targetId)
      }
    })
  })
}

function initializeWorkoutFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const workoutCards = document.querySelectorAll(".workout-card")

  console.log("Found filter buttons:", filterButtons.length)
  console.log("Found workout cards:", workoutCards.length)

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")
      console.log("Filter clicked:", filter)

      // Update active button styling
      filterButtons.forEach((btn) => {
        btn.classList.remove(
          "active",
          "bg-gradient-to-r",
          "from-primary-600",
          "to-primary-700",
          "text-white",
          "shadow-lg",
          "scale-105",
        )
        btn.classList.add(
          "bg-gray-200",
          "dark:bg-gray-700",
          "text-gray-700",
          "dark:text-gray-300",
          "hover:bg-gray-300",
          "dark:hover:bg-gray-600",
        )
      })

      this.classList.add(
        "active",
        "bg-gradient-to-r",
        "from-primary-600",
        "to-primary-700",
        "text-white",
        "shadow-lg",
        "scale-105",
      )
      this.classList.remove(
        "bg-gray-200",
        "dark:bg-gray-700",
        "text-gray-700",
        "dark:text-gray-300",
        "hover:bg-gray-300",
        "dark:hover:bg-gray-600",
      )

      // Filter workout cards with enhanced animations
      workoutCards.forEach((card, index) => {
        const shouldShow = filter === "all" || card.classList.contains(filter)

        if (shouldShow) {
          card.style.display = "block"
          card.style.opacity = "0"
          card.style.transform = "translateY(20px)"

          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
            card.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          }, index * 100)
        } else {
          card.style.opacity = "0"
          card.style.transform = "translateY(-20px)"
          setTimeout(() => {
            card.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Initialize filter buttons styling
  filterButtons.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.add("bg-gradient-to-r", "from-primary-600", "to-primary-700", "text-white", "shadow-lg")
    } else {
      btn.classList.add(
        "bg-gray-200",
        "dark:bg-gray-700",
        "text-gray-700",
        "dark:text-gray-300",
        "hover:bg-gray-300",
        "dark:hover:bg-gray-600",
      )
    }
  })
}

function initializeVideoModal() {
  const videoModal = document.getElementById("video-modal")
  const modalVideo = document.getElementById("modal-video")
  const closeModal = document.getElementById("close-modal")
  const videoPlayButtons = document.querySelectorAll(".video-play-btn")

  console.log("Found video play buttons:", videoPlayButtons.length)

  videoPlayButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      const videoId = button.getAttribute("data-video")
      if (videoId && videoModal && modalVideo) {
        modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`
        videoModal.classList.remove("hidden")
        document.body.style.overflow = "hidden"
        console.log("Opened video modal for:", videoId)
      }
    })
  })

  if (closeModal && videoModal && modalVideo) {
    closeModal.addEventListener("click", () => {
      videoModal.classList.add("hidden")
      modalVideo.src = ""
      document.body.style.overflow = "auto"
      console.log("Closed video modal")
    })

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.classList.add("hidden")
        modalVideo.src = ""
        document.body.style.overflow = "auto"
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
        videoModal.classList.add("hidden")
        modalVideo.src = ""
        document.body.style.overflow = "auto"
      }
    })
  }
}

function initializeBMICalculator() {
  const bmiForm = document.getElementById("bmi-form")
  const bmiResult = document.getElementById("bmi-result")
  const bmiPlaceholder = document.getElementById("bmi-placeholder")
  const bmiValue = document.getElementById("bmi-value")
  const bmiCategory = document.getElementById("bmi-category")
  const bmiMeaning = document.getElementById("bmi-meaning")
  const bmiRecommendations = document.getElementById("bmi-recommendations")

  if (bmiForm) {
    bmiForm.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("BMI form submitted")

      const heightInput = document.getElementById("height")
      const weightInput = document.getElementById("weight")

      if (!heightInput || !weightInput) {
        console.error("Height or weight input not found")
        return
      }

      const height = Number.parseFloat(heightInput.value)
      const weight = Number.parseFloat(weightInput.value)

      console.log("Height:", height, "Weight:", weight)

      if (height && weight && height > 0 && weight > 0) {
        const heightInMeters = height / 100
        const bmi = weight / (heightInMeters * heightInMeters)
        const bmiRounded = Math.round(bmi * 10) / 10

        let category, meaning, recommendations, categoryColor

        if (bmi < 18.5) {
          category = "Underweight"
          categoryColor = "text-blue-600 dark:text-blue-400"
          meaning =
            "Your BMI indicates that you are underweight. This may suggest that you need to gain some weight for optimal health."
          recommendations =
            "Consider consulting with a healthcare provider or nutritionist to develop a healthy weight gain plan that includes nutrient-rich foods and appropriate exercise."
        } else if (bmi >= 18.5 && bmi < 25) {
          category = "Normal Weight"
          categoryColor = "text-green-600 dark:text-green-400"
          meaning =
            "Congratulations! Your BMI falls within the normal weight range, which is associated with lower risk of chronic diseases."
          recommendations =
            "Maintain your current weight through a balanced diet and regular physical activity. Continue with your healthy lifestyle habits."
        } else if (bmi >= 25 && bmi < 30) {
          category = "Overweight"
          categoryColor = "text-yellow-600 dark:text-yellow-400"
          meaning =
            "Your BMI indicates that you are overweight. This may increase your risk of developing health problems."
          recommendations =
            "Consider adopting a healthier diet and increasing physical activity. Small, sustainable changes can help you reach a healthier weight."
        } else {
          category = "Obese"
          categoryColor = "text-red-600 dark:text-red-400"
          meaning = "Your BMI indicates obesity, which significantly increases the risk of serious health conditions."
          recommendations =
            "It's important to consult with a healthcare provider to develop a comprehensive weight management plan that may include diet, exercise, and medical support."
        }

        // Animate BMI value counting up
        if (bmiValue) {
          let currentValue = 0
          const increment = bmiRounded / 30
          const counter = setInterval(() => {
            currentValue += increment
            bmiValue.textContent = Math.min(currentValue, bmiRounded).toFixed(1)

            if (currentValue >= bmiRounded) {
              clearInterval(counter)
              bmiValue.textContent = bmiRounded
            }
          }, 50)
        }

        if (bmiCategory) {
          bmiCategory.textContent = category
          bmiCategory.className = `text-lg font-semibold ${categoryColor}`
        }

        if (bmiMeaning) bmiMeaning.textContent = meaning
        if (bmiRecommendations) bmiRecommendations.textContent = recommendations

        // Enhanced result display animation
        if (bmiPlaceholder && bmiResult) {
          bmiPlaceholder.style.opacity = "0"
          bmiPlaceholder.style.transform = "translateY(-20px)"

          setTimeout(() => {
            bmiPlaceholder.classList.add("hidden")
            bmiResult.classList.remove("hidden")
            bmiResult.style.opacity = "0"
            bmiResult.style.transform = "translateY(20px)"

            setTimeout(() => {
              bmiResult.style.opacity = "1"
              bmiResult.style.transform = "translateY(0)"
              bmiResult.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }, 100)
          }, 300)
        }

        console.log("BMI calculated:", bmiRounded, "Category:", category)
      } else {
        console.error("Invalid height or weight values")
        alert("Please enter valid height and weight values.")
      }
    })
  }
}

function initializeScrollAnimations() {
  const animateElements = document.querySelectorAll(".scroll-animate")
  console.log("Initializing scroll animations for", animateElements.length, "elements")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animateElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    observer.observe(element)
  })
}

function initializeEnhancedInteractions() {
  // Add scroll progress indicator
  const scrollProgress = document.createElement("div")
  scrollProgress.className =
    "fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 z-50 transition-all duration-300"
  scrollProgress.style.width = "0%"
  document.body.appendChild(scrollProgress)

  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    scrollProgress.style.width = `${Math.min(scrolled, 100)}%`
  })

  // Enhanced button interactions
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      if (!button.disabled && !button.classList.contains("no-hover")) {
        button.style.transform = "translateY(-2px)"
        button.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
      }
    })

    button.addEventListener("mouseleave", () => {
      if (!button.classList.contains("no-hover")) {
        button.style.transform = "translateY(0)"
        button.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
      }
    })
  })

  // Counter animations for stats
  const counters = document.querySelectorAll(".counter")
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.dataset.target)
        const duration = 2000
        const increment = target / (duration / 16)
        let current = 0

        const timer = setInterval(() => {
          current += increment
          counter.textContent = Math.floor(current)

          if (current >= target) {
            counter.textContent = target
            clearInterval(timer)
          }
        }, 16)

        counterObserver.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => {
    counterObserver.observe(counter)
  })
}

function initializeMotivationFeatures() {
  // Quote rotation
  const quotes = [
    { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
    { text: "Success isn't given. It's earned in the gym.", author: "Unknown" },
    { text: "Your body can do it. It's your mind you need to convince.", author: "Unknown" },
    { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Unknown" },
    { text: "Don't wish for it, work for it.", author: "Unknown" },
    { text: "Sweat is fat crying.", author: "Unknown" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  ]

  let currentQuoteIndex = 0

  function updateQuote() {
    const quoteElement = document.querySelector("blockquote")
    const authorElement = document.querySelector("cite")

    if (quoteElement && authorElement) {
      const quote = quotes[currentQuoteIndex]
      quoteElement.textContent = `"${quote.text}"`
      authorElement.textContent = `- ${quote.author}`
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length
    }
  }

  // New quote button
  const newQuoteButton = document.querySelector("button:has(i.fa-sync-alt)")
  if (newQuoteButton) {
    newQuoteButton.addEventListener("click", updateQuote)
  }

  // Auto-rotate quotes every 30 seconds
  setInterval(updateQuote, 30000)
}

function initializeProgressTracking() {
  // Simulate progress updates
  const progressBars = document.querySelectorAll('[style*="width:"]')

  // Add click handlers for challenge acceptance
  const challengeButton = document.querySelector("button:has(i.fa-check)")
  if (challengeButton) {
    challengeButton.addEventListener("click", () => {
      challengeButton.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Challenge Accepted!'
      challengeButton.classList.add("bg-green-600", "hover:bg-green-700")
      challengeButton.classList.remove("bg-orange-600", "hover:bg-orange-700")

      // Show success message
      setTimeout(() => {
        challengeButton.innerHTML = '<i class="fas fa-trophy mr-2"></i>Challenge Complete!'
        challengeButton.classList.add("bg-yellow-600", "hover:bg-yellow-700")
        challengeButton.classList.remove("bg-green-600", "hover:bg-green-700")
      }, 3000)
    })
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error)
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason)
})

// Page load performance
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
  console.log("Page fully loaded")

  // Animate hero elements on load
  const heroElements = document.querySelectorAll("#home .animate-fade-in-up")
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, index * 200)
  })
})
