// Enhanced Three.js 3D Scene for Hero Section
let scene, camera, renderer, dumbbell, animationId, particles, geometryShapes

function initThreeScene() {
  const container = document.getElementById("three-container")
  if (!container) {
    console.log("Three.js container not found")
    return
  }

  // Check if THREE is available
  if (typeof THREE === "undefined") {
    console.error("THREE.js not loaded")
    return
  }

  console.log("Initializing Enhanced Three.js scene...")

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setClearColor(0x000000, 0)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  // Enhanced Lighting System
  setupLighting()

  // Create main dumbbell
  createDumbbell()

  // Create floating geometric shapes
  createGeometricShapes()

  // Create particle system
  createParticleSystem()

  // Position camera
  camera.position.z = 8
  camera.position.y = 2
  camera.lookAt(0, 0, 0)

  // Start animation
  animate()

  // Handle window resize
  window.addEventListener("resize", onWindowResize, false)

  console.log("Enhanced Three.js scene initialized successfully")
}

function setupLighting() {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
  scene.add(ambientLight)

  // Main directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
  directionalLight.position.set(5, 5, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Colored point lights for atmosphere
  const pointLight1 = new THREE.PointLight(0x6366f1, 1.0, 100) // Primary purple
  pointLight1.position.set(-6, 6, 6)
  scene.add(pointLight1)

  const pointLight2 = new THREE.PointLight(0x06b6d4, 0.8, 100) // Accent cyan
  pointLight2.position.set(6, -6, -6)
  scene.add(pointLight2)

  const pointLight3 = new THREE.PointLight(0x000000, 0.6, 80) // Secondary pink
  pointLight3.position.set(0, 8, -4)
  scene.add(pointLight3)

  // Rim light
  const rimLight = new THREE.DirectionalLight(0x00ffff, 0.5)
  rimLight.position.set(-5, 0, -5)
  scene.add(rimLight)
}

function createDumbbell() {
  const dumbbellGroup = new THREE.Group()

  // Enhanced Materials
  const handleMaterial = new THREE.MeshPhongMaterial({
    color: 0x2a2a2a,
    shininess: 150,
    specular: 0x444444,
    emissive: 0x111111,
  })

  const weightMaterial = new THREE.MeshPhongMaterial({
    color: 0x6366f1,
    shininess: 120,
    specular: 0x4f46e5,
    emissive: 0x1e1b4b,
  })

  const accentMaterial = new THREE.MeshPhongMaterial({
    color: 0x06b6d4,
    shininess: 100,
    specular: 0x0891b2,
    emissive: 0x164e63,
  })

  // Handle (cylinder)
  const handleGeometry = new THREE.CylinderGeometry(0.12, 0.12, 3.2, 20)
  const handle = new THREE.Mesh(handleGeometry, handleMaterial)
  handle.rotation.z = Math.PI / 2
  handle.castShadow = true
  dumbbellGroup.add(handle)

  // Weights (spheres)
  const weightGeometry = new THREE.SphereGeometry(0.9, 20, 16)

  const leftWeight = new THREE.Mesh(weightGeometry, weightMaterial)
  leftWeight.position.x = -2.0
  leftWeight.scale.x = 0.75
  leftWeight.castShadow = true
  dumbbellGroup.add(leftWeight)

  const rightWeight = new THREE.Mesh(weightGeometry, weightMaterial)
  rightWeight.position.x = 2.0
  rightWeight.scale.x = 0.75
  rightWeight.castShadow = true
  dumbbellGroup.add(rightWeight)

  // Detail rings
  for (let i = 0; i < 4; i++) {
    const ringGeometry = new THREE.TorusGeometry(0.95, 0.06, 10, 20)
    const ringMaterial = i % 2 === 0 ? accentMaterial : weightMaterial

    const leftRing = new THREE.Mesh(ringGeometry, ringMaterial)
    leftRing.position.x = -2.0
    leftRing.position.z = (i - 1.5) * 0.25
    leftRing.rotation.y = Math.PI / 2
    leftRing.castShadow = true
    dumbbellGroup.add(leftRing)

    const rightRing = new THREE.Mesh(ringGeometry, ringMaterial)
    rightRing.position.x = 2.0
    rightRing.position.z = (i - 1.5) * 0.25
    rightRing.rotation.y = Math.PI / 2
    rightRing.castShadow = true
    dumbbellGroup.add(rightRing)
  }

  dumbbell = dumbbellGroup
  scene.add(dumbbell)
}

function createGeometricShapes() {
  geometryShapes = new THREE.Group()

  const shapes = [
    { geometry: new THREE.BoxGeometry(0.5, 0.5, 0.5), color: 0x6366f1 },
    { geometry: new THREE.SphereGeometry(0.3, 16, 16), color: 0x06b6d4 },
    { geometry: new THREE.ConeGeometry(0.3, 0.6, 8), color: 0xd946ef },
    { geometry: new THREE.OctahedronGeometry(0.4), color: 0xa855f7 },
    { geometry: new THREE.TetrahedronGeometry(0.4), color: 0x10b981 },
  ]

  for (let i = 0; i < 15; i++) {
    const shapeData = shapes[Math.floor(Math.random() * shapes.length)]
    const material = new THREE.MeshPhongMaterial({
      color: shapeData.color,
      transparent: true,
      opacity: 0.7,
      shininess: 100,
    })

    const mesh = new THREE.Mesh(shapeData.geometry, material)
    mesh.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15)

    mesh.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)

    mesh.userData = {
      originalPosition: mesh.position.clone(),
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      },
      floatSpeed: Math.random() * 0.01 + 0.005,
      floatAmplitude: Math.random() * 2 + 1,
    }

    geometryShapes.add(mesh)
  }

  scene.add(geometryShapes)
}

function createParticleSystem() {
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  const colorPalette = [
    new THREE.Color(0x6366f1),
    new THREE.Color(0x06b6d4),
    new THREE.Color(0xd946ef),
    new THREE.Color(0xa855f7),
    new THREE.Color(0x10b981),
  ]

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b

    sizes[i] = Math.random() * 3 + 1
  }

  const particleGeometry = new THREE.BufferGeometry()
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        float distance = length(gl_PointCoord - vec2(0.5));
        if (distance > 0.5) discard;
        
        float alpha = 1.0 - (distance * 2.0);
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
  })

  particles = new THREE.Points(particleGeometry, particleMaterial)
  scene.add(particles)
}

function animate() {
  animationId = requestAnimationFrame(animate)

  const time = Date.now() * 0.001

  if (dumbbell) {
    // Rotate dumbbell
    dumbbell.rotation.y += 0.005
    dumbbell.rotation.x += 0.002

    // Floating motion
    dumbbell.position.y = Math.sin(time) * 0.3
  }

  if (geometryShapes) {
    geometryShapes.children.forEach((shape) => {
      // Rotate shapes
      shape.rotation.x += shape.userData.rotationSpeed.x
      shape.rotation.y += shape.userData.rotationSpeed.y
      shape.rotation.z += shape.userData.rotationSpeed.z

      // Float shapes
      shape.position.y =
        shape.userData.originalPosition.y + Math.sin(time * shape.userData.floatSpeed) * shape.userData.floatAmplitude
    })
  }

  if (particles) {
    // Animate particles
    const positions = particles.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + i) * 0.01
    }
    particles.geometry.attributes.position.needsUpdate = true

    // Update particle material time
    particles.material.uniforms.time.value = time
  }

  if (renderer && scene && camera) {
    renderer.render(scene, camera)
  }
}

function onWindowResize() {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

function cleanupThreeScene() {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }

  if (renderer) {
    renderer.dispose()
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(initThreeScene, 100)
})

// Cleanup on page unload
window.addEventListener("beforeunload", cleanupThreeScene)
