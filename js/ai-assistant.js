// AI Assistant functionality with OpenAI API integration
class AIAssistant {
  constructor() {
    this.chatContainer = document.getElementById("chat-container")
    this.chatInput = document.getElementById("chat-input")
    this.sendButton = document.getElementById("send-message")
    this.loadingIndicator = document.getElementById("loading-indicator")
    this.quickActionButtons = document.querySelectorAll(".quick-action-btn")
    this.apiKeyInput = document.getElementById("api-key-input")

    this.initializeEventListeners()
    this.conversationHistory = []
    this.apiKey = localStorage.getItem("openai-api-key") || ""

    // Load saved API key
    if (this.apiKey) {
      this.apiKeyInput.value = this.apiKey
    }

    console.log("AI Assistant initialized")
  }

  initializeEventListeners() {
    // Send message on button click
    this.sendButton.addEventListener("click", () => {
      this.sendMessage()
    })

    // Send message on Enter key press
    this.chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.sendMessage()
      }
    })

    // Save API key on input
    this.apiKeyInput.addEventListener("input", (e) => {
      this.apiKey = e.target.value
      localStorage.setItem("openai-api-key", this.apiKey)
    })

    // Quick action buttons
    this.quickActionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const prompt = button.getAttribute("data-prompt")
        this.chatInput.value = prompt
        this.sendMessage()
      })
    })
  }

  async sendMessage() {
    const message = this.chatInput.value.trim()
    if (!message) return


    if (!this.apiKey) {
      this.addMessageToChat("Please enter your OpenAI API key to use the AI assistant.", "system")
      return
    }

    this.addMessageToChat(message, "user")
    this.chatInput.value = ""

    this.showLoading(true)

    try {
      const response = await this.callOpenAI(message)
      this.addMessageToChat(response, "assistant")
    } catch (error) {
      console.error("Error calling AI assistant:", error)
      let errorMessage = "I apologize, but I'm having trouble connecting right now. "

      if (error.message.includes("401")) {
        errorMessage += "Please check your API key and try again."
      } else if (error.message.includes("429")) {
        errorMessage += "Rate limit exceeded. Please try again in a moment."
      } else {
        errorMessage += "Please try again later or use one of the quick actions above."
      }

      this.addMessageToChat(errorMessage, "assistant")
    }

    this.showLoading(false)
  }

  async callOpenAI(message) {

    this.conversationHistory.push({
      role: "user",
      content: message,
    })

    const systemPrompt = {
      role: "system",
      content: `You are a professional fitness coach and nutritionist AI assistant. You provide helpful, accurate, and motivating advice about:
      - Workout routines and exercise techniques
      - Nutrition and meal planning
      - Fitness goals and progress tracking
      - Injury prevention and recovery
      - Mental health and motivation
      
      Always provide practical, actionable advice. Use markdown formatting for better readability. Be encouraging and supportive while maintaining professionalism. If asked about medical conditions, always recommend consulting with healthcare professionals.`,
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [systemPrompt, ...this.conversationHistory],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const assistantMessage = data.choices[0].message.content

    this.conversationHistory.push({
      role: "assistant",
      content: assistantMessage,
    })

    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10)
    }

    return assistantMessage
  }

  addMessageToChat(message, sender) {
    const messageDiv = document.createElement("div")
    messageDiv.className = `flex items-start space-x-3 mb-6 ${sender === "user" ? "justify-end" : ""} animate-fade-in-up`

    if (sender === "assistant") {
      // Parse markdown and sanitize HTML
      const htmlContent = marked.parse(message)
      const sanitizedContent = DOMPurify.sanitize(htmlContent)

      messageDiv.innerHTML = `
        <div class="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <i class="fas fa-robot text-white"></i>
        </div>
        <div class="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-4 max-w-lg shadow-lg border border-gray-200 dark:border-gray-600">
          <div class="markdown-content text-sm leading-relaxed text-gray-800 dark:text-gray-200">${sanitizedContent}</div>
        </div>
      `
    } else if (sender === "system") {
      messageDiv.innerHTML = `
        <div class="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <i class="fas fa-exclamation-triangle text-white"></i>
        </div>
        <div class="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-4 max-w-lg shadow-lg border border-yellow-200 dark:border-yellow-700">
          <p class="text-sm leading-relaxed text-yellow-800 dark:text-yellow-200">${message}</p>
        </div>
      `
    } else {
      messageDiv.innerHTML = `
        <div class="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl p-4 max-w-lg shadow-lg">
          <p class="text-sm leading-relaxed">${message}</p>
        </div>
        <div class="w-10 h-10 bg-gradient-to-r from-accent-600 to-accent-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
          <i class="fas fa-user text-white"></i>
        </div>
      `
    }

    this.chatContainer.appendChild(messageDiv)
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight

    // Add animation
    setTimeout(() => {
      messageDiv.classList.add("animate-fade-in-up")
    }, 100)
  }

  showLoading(show) {
    if (show) {
      this.loadingIndicator.classList.remove("hidden")
      this.sendButton.disabled = true
      this.chatInput.disabled = true
      this.sendButton.innerHTML = `
        <div class="flex items-center justify-center">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          <i class="fas fa-paper-plane"></i>
        </div>
      `
    } else {
      this.loadingIndicator.classList.add("hidden")
      this.sendButton.disabled = false
      this.chatInput.disabled = false
      this.sendButton.innerHTML = '<i class="fas fa-paper-plane"></i>'
      this.chatInput.focus()
    }
  }
}

// Initialize AI Assistant when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new AIAssistant()
})
