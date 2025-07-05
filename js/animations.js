// Advanced animations and scroll effects
class AnimationController {
  constructor() {
    this.init()
  }

  init() {
    this.setupScrollAnimations()
    this.setupParallaxEffects()
    this.setupHoverAnimations()
    this.setupCounterAnimations()
    this.setupAdvancedAnimations()
    this.setupTextAnimations()
    this.setupMorphingShapes()
    this.setupGlowEffects()
  }

  setupScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target

          // Add different animation classes based on data attributes
          if (element.dataset.animation) {
            element.classList.add(element.dataset.animation)
          } else {
            element.classList.add("animate-fade-in-up")
          }

          // Stagger animations for child elements
          const children = element.querySelectorAll(".stagger-animation")
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add("animate-fade-in-up")
            }, index * 100)
          })

          observer.unobserve(element)
        }
      })
    }, observerOptions)

    // Observe all elements with scroll-animate class
    document.querySelectorAll(".scroll-animate").forEach((el) => {
      observer.observe(el)
    })
  }

  setupParallaxEffects() {
    let ticking = false

    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax")

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })

      ticking = false
    }

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener("scroll", requestTick)
  }

  setupHoverAnimations() {
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll(".workout-card, .quick-action-btn")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px) scale(1.02)"
        card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)"
        card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
        card.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)"
      })
    })

    // Button hover effects
    const buttons = document.querySelectorAll("button:not(.no-hover)")

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        if (!button.disabled) {
          button.style.transform = "translateY(-2px)"
          button.style.transition = "all 0.2s ease"
        }
      })

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)"
      })
    })
  }

  setupCounterAnimations() {
    // Animated counters for statistics
    const counters = document.querySelectorAll(".counter")

    const animateCounter = (counter) => {
      const target = Number.parseInt(counter.dataset.target)
      const duration = Number.parseInt(counter.dataset.duration) || 2000
      const start = 0
      const increment = target / (duration / 16)
      let current = start

      const timer = setInterval(() => {
        current += increment
        counter.textContent = Math.floor(current)

        if (current >= target) {
          counter.textContent = target
          clearInterval(timer)
        }
      }, 16)
    }

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target)
          counterObserver.unobserve(entry.target)
        }
      })
    })

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  setupAdvancedAnimations() {
    // Magnetic hover effect for cards
    const cards = document.querySelectorAll(".card-hover")

    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)"
      })
    })
  }

  setupTextAnimations() {
    // Typewriter effect for hero text
    const heroTitle = document.querySelector(".gradient-text")
    if (heroTitle) {
      const text = heroTitle.textContent
      heroTitle.textContent = ""

      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          heroTitle.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        }
      }

      setTimeout(typeWriter, 1000)
    }
  }

  setupMorphingShapes() {
    // Create morphing background shapes
    const hero = document.querySelector("#home")
    if (hero) {
      for (let i = 0; i < 5; i++) {
        const shape = document.createElement("div")
        shape.className = "absolute opacity-10 pointer-events-none"
        shape.style.cssText = `
                width: ${Math.random() * 200 + 100}px;
                height: ${Math.random() * 200 + 100}px;
                background: linear-gradient(45deg, #6366f1, #06b6d4, #d946ef);
                border-radius: ${Math.random() * 50 + 25}%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: morph ${Math.random() * 10 + 10}s ease-in-out infinite;
                filter: blur(1px);
            `
        hero.appendChild(shape)
      }
    }

    // Add morphing keyframes
    if (!document.querySelector("#morph-keyframes")) {
      const style = document.createElement("style")
      style.id = "morph-keyframes"
      style.textContent = `
            @keyframes morph {
                0%, 100% { 
                    border-radius: 25% 75% 75% 25% / 25% 25% 75% 75%;
                    transform: rotate(0deg) scale(1);
                }
                25% { 
                    border-radius: 75% 25% 25% 75% / 75% 75% 25% 25%;
                    transform: rotate(90deg) scale(1.1);
                }
                50% { 
                    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50%;
                    transform: rotate(180deg) scale(0.9);
                }
                75% { 
                    border-radius: 25% 75% 25% 75% / 75% 25% 75% 25%;
                    transform: rotate(270deg) scale(1.05);
                }
            }
        `
      document.head.appendChild(style)
    }
  }

  setupGlowEffects() {
    // Add dynamic glow effects to buttons
    const buttons = document.querySelectorAll(".btn-glow")

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.boxShadow = "0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.4)"
        button.style.transform = "translateY(-2px) scale(1.05)"
      })

      button.addEventListener("mouseleave", () => {
        button.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)"
        button.style.transform = "translateY(0) scale(1)"
      })
    })
  }

  // Utility method to add custom animations
  addCustomAnimation(element, animationClass, delay = 0) {
    setTimeout(() => {
      element.classList.add(animationClass)
    }, delay)
  }

  // Method to create floating elements
  createFloatingElements(container, count = 10) {
    for (let i = 0; i < count; i++) {
      const element = document.createElement("div")
      element.className = "floating-element"
      element.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(59, 130, 246, 0.3);
                border-radius: 50%;
                pointer-events: none;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `

      container.appendChild(element)
    }

    // Add floating animation keyframes if not already added
    if (!document.querySelector("#floating-keyframes")) {
      const style = document.createElement("style")
      style.id = "floating-keyframes"
      style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
                }
            `
      document.head.appendChild(style)
    }
  }
}

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AnimationController()

  // Add floating elements to hero section
  const heroSection = document.querySelector("#home")
  if (heroSection) {
    new AnimationController().createFloatingElements(heroSection, 15)
  }
})

// Smooth scroll behavior for better UX
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        const headerOffset = 80
        const elementPosition = target.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
})
