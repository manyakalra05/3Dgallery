import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'

const Project = ({ basePosition, project, active, onClick, isAnyProjectActive }) => {
  const groupRef = useRef()
  const { scene } = useGLTF(project.modelPath)
  
  // Spring animations for position and scale
  const { position, scale } = useSpring({
    position: active ? [0, 0, 0] : basePosition,
    scale: active ? [1.2, 1.2, 1.2] : [1, 1, 1],
    config: { mass: 1, tension: 170, friction: 26 }
  })

  // Auto-rotation when no project is active
  useFrame(() => {
    if (groupRef.current && !isAnyProjectActive) {
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <a.group
      position={position}
      ref={groupRef}
      onClick={onClick}
      scale={scale}
      dispose={null}
    >
      <primitive 
        object={scene} 
        position={project.positionOffset || [0, 0, 0]}
        rotation={[0, Math.PI / 4, 0]}
        scale={project.scale || [0.5, 0.5, 0.5]}
      />
      
      {active && (
        <Html center>
          <div className="project-info">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <a href={project.link} className="project-link">View Project</a>
          </div>
        </Html>
      )}
    </a.group>
  )
}

export default Project