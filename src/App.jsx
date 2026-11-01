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
        dpr={[1, 2]}
        camera={{ position: [8, 6, 8], fov: 45, near: 0.01 }}
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
          target={[0.3, 0.75, 1.61]} 
          minDistance={0.05}
          maxDistance={15}
          maxPolarAngle={Math.PI / 2 - 0.05} 
        />
      </Canvas>
    </div>
  )
}