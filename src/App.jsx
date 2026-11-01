import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Room from './components/Room'
import Sidebar from './components/Sidebar'
import InfoModal from './components/InfoModal'
import SpotifyModal from './components/SpotifyModal'

export default function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false)
// render <SpotifyModal isOpen={isSpotifyOpen} onClose={() => setIsSpotifyOpen(false)} />

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0c', position: 'relative' }}>
      {/* Sidebar with Info trigger */}
     {/* Sidebar with modal triggers */}
      <Sidebar 
        onOpenInfo={() => setIsInfoOpen(true)} 
        onOpenSpotify={() => setIsSpotifyOpen(true)} 
      />

      {/* Modals */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
      <SpotifyModal isOpen={isSpotifyOpen} onClose={() => setIsSpotifyOpen(false)} />

      <Canvas
        // 1. Pulled back into the room (X: 2.2), eye-level (Y: 1.15), centered on desk (Z: 0.13)
        camera={{ position: [2.2, 1.15, 0.89], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#0a0a0c']} />

        {/* Ambient base lighting */}
        <ambientLight intensity={0.5} />

        {/* Studio fill light */}
        <directionalLight position={[6, 8, 5]} intensity={1.2} />

        {/* Loads the Room geometry */}
        <Room />

        {/* Orbit Controls */}
        <OrbitControls 
          makeDefault 
          // 2. Focal target looking exactly at the monitor's center on the left wall
          target={[0, 0.95, 0.89]} 
          
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={0.5} 
          maxDistance={5.0} 
        />
      </Canvas>
    </div>
  )
}