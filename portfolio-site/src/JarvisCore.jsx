import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function JarvisCore() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.05, 4),
      new THREE.MeshPhysicalMaterial({
        color: 0x36e6ff,
        emissive: 0x0aa7c4,
        emissiveIntensity: 1.4,
        transparent: true,
        opacity: 0.86,
        roughness: 0.18,
        metalness: 0.25,
        wireframe: true,
      }),
    )
    group.add(core)

    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(0.62, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0xe7fdff, transparent: true, opacity: 0.26 }),
    )
    group.add(inner)

    const ringConfigs = [
      [1.52, 0.022, 0.18, 0.55],
      [1.82, 0.018, 1.1, 0.16],
      [2.1, 0.012, 0.58, 1.12],
    ]
    const rings = ringConfigs.map(([radius, tube, x, y]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 16, 160),
        new THREE.MeshBasicMaterial({ color: 0x72efff, transparent: true, opacity: 0.72 }),
      )
      ring.rotation.set(x, y, 0)
      group.add(ring)
      return ring
    })

    const count = 720
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const radius = 2.6 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0x89f2ff, size: 0.018, transparent: true, opacity: 0.56 }),
    )
    scene.add(particles)

    const light = new THREE.PointLight(0x43eaff, 18, 16)
    light.position.set(0, 0, 3)
    scene.add(light)

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (event) => {
      const rect = mount.getBoundingClientRect()
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.45
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3
    }
    mount.addEventListener('pointermove', onPointerMove)

    const clock = new THREE.Clock()
    let frame
    const render = () => {
      const time = clock.getElapsedTime()
      if (!reduceMotion) {
        group.rotation.y += (pointerX + time * 0.06 - group.rotation.y) * 0.025
        group.rotation.x += (-pointerY + Math.sin(time * 0.35) * 0.05 - group.rotation.x) * 0.025
        rings[0].rotation.z = time * 0.15
        rings[1].rotation.z = -time * 0.1
        rings[2].rotation.z = time * 0.08
        particles.rotation.y = time * 0.012
        inner.scale.setScalar(1 + Math.sin(time * 2.2) * 0.06)
      }
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(mount)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      mount.removeEventListener('pointermove', onPointerMove)
      particleGeometry.dispose()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="core-canvas" ref={mountRef} aria-label="Interactive three dimensional JARVIS intelligence core" role="img" />
}
