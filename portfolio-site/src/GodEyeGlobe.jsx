import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GodEyeGlobe() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(0, 0.25, 5.5)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const globe = new THREE.Group()
    scene.add(globe)
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 48, 48),
      new THREE.MeshPhongMaterial({ color: 0x061b23, emissive: 0x032b38, emissiveIntensity: 0.5, shininess: 72 }),
    )
    globe.add(earth)
    const grid = new THREE.Mesh(
      new THREE.SphereGeometry(1.575, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x27dff8, wireframe: true, transparent: true, opacity: 0.24 }),
    )
    globe.add(grid)

    const orbit = new THREE.Mesh(
      new THREE.TorusGeometry(2.08, 0.012, 12, 192),
      new THREE.MeshBasicMaterial({ color: 0xb9f9ff, transparent: true, opacity: 0.72 }),
    )
    orbit.rotation.x = 1.14
    globe.add(orbit)

    const station = new THREE.Group()
    const stationBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.13, 0.09, 0.18),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    )
    const panels = new THREE.Mesh(
      new THREE.BoxGeometry(0.62, 0.025, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x40dff8 }),
    )
    station.add(stationBody, panels)
    globe.add(station)

    scene.add(new THREE.AmbientLight(0x9fefff, 1.1))
    const key = new THREE.DirectionalLight(0xd7fbff, 4)
    key.position.set(3, 2, 4)
    scene.add(key)

    let frame
    const clock = new THREE.Clock()
    const draw = () => {
      const t = clock.getElapsedTime()
      if (!reduced) {
        globe.rotation.y = t * 0.075
        const angle = t * 0.32
        station.position.set(Math.cos(angle) * 2.08, Math.sin(angle) * 0.85, Math.sin(angle) * 1.9)
        station.rotation.z = angle
      } else {
        station.position.set(1.7, 0.7, 0.9)
      }
      renderer.render(scene, camera)
      frame = requestAnimationFrame(draw)
    }
    draw()

    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    })
    resizeObserver.observe(mount)

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="globe-canvas" ref={mountRef} aria-label="Animated three dimensional Earth with an orbital station path" role="img" />
}
