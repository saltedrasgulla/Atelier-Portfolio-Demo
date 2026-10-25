import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Room from './components/Room'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0c' }}>
     <Canvas
  camera={{ position: [5.2, 4.2, 6.2], fov: 45 }}
  gl={{ antialias: true, alpha: false }}
>
        <color attach="background" args={['#0a0a0c']} />

        {/* Ambient base lighting */}
        <ambientLight intensity={0.5} />

        {/* Studio directional fill */}
        <directionalLight position={[6, 8, 5]} intensity={1.2} />

        {/* Room geometry */}
        <Suspense fallback={null}>
          <Room />
        </Suspense>

        {/* Orbit around the center of the quadrant room (X: 3m, Y: 1m, Z: 2.5m) */}
      <OrbitControls 
  makeDefault 
  target={[1.34, 1.2, 1.70]} 
  maxPolarAngle={Math.PI / 2 - 0.05} 
  minDistance={1.8}
  maxDistance={18}
/>
</Canvas>
    </div>
  )
}