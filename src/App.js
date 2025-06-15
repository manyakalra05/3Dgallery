import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Loader, Grid, useHelper } from '@react-three/drei'
import { projects } from './utils/projectsData'
import Project from './components/Project'
import './App.css'
import * as THREE from 'three'

export default function App() {
  const [activeProject, setActiveProject] = useState(null)
  const [radius, setRadius] = useState(7)

  useEffect(() => {
    const handleResize = () => {
      setRadius(window.innerWidth < 768 ? 5 : 7)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="app">
      <Canvas 
        camera={{ position: [0, 5, 15], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#f54242" />
        
        <Environment preset="city" />
        <Grid cellColor="gray" args={[20, 20]} />
        
        <Suspense fallback={null}>
          {projects.map((project, index) => {
            // Spiral layout calculations
            const angle = (index / projects.length) * Math.PI * 2
            const spiralFactor = 0.5
            const y = Math.sin(index * 0.5) * 2 // Vertical spiral
            const x = Math.sin(angle) * radius * (1 + spiralFactor * index/projects.length)
            const z = Math.cos(angle) * radius * (1 + spiralFactor * index/projects.length)
            
            return (
              <Project 
                key={project.id}
                basePosition={[x, y, z]}
                project={project}
                active={activeProject === project.id}
                onClick={() => setActiveProject(
                  activeProject === project.id ? null : project.id
                )}
                isAnyProjectActive={activeProject !== null}
              />
            )
          })}
        </Suspense>

        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={5}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <Loader />
    </div>
  )
}