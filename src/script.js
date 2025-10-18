import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const doorTexture = textureLoader.load('/textures/door/color.jpg')
doorTexture.colorSpace = THREE.SRGBColorSpace
doorTexture.wrapS = THREE.RepeatWrapping
doorTexture.wrapT = THREE.RepeatWrapping
doorTexture.repeat.set(2, 2) // optional: repeat 2x2

const material = new THREE.MeshBasicMaterial({ map: doorTexture })
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
scene.add(cube)

const sizes = { width: window.innerWidth, height: window.innerHeight }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

function tick() {
  const t = performance.now() / 1000
  cube.rotation.x = cube.rotation.y = t * 0.5
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()