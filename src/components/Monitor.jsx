import { Html } from '@react-three/drei'
import DesktopOS from './DesktopOS'

export default function Monitor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  // Screen dimensions in 3D world meters (24" monitor: 52cm x 32cm)
  const screenWidth = 0.52
  const screenHeight = 0.32

  // Exact scale factor: 800px DOM width -> 0.52m 3D width
  const htmlScale = screenWidth / 800 // 0.00065

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Stand Base Plate on Desktop Surface */}
      <mesh position={[0, 0.006, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.16, 0.012, 0.20]} />
        <meshStandardMaterial color="#22252a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 2. Stand Upright Neck */}
      <mesh position={[-0.03, 0.12, 0]} castShadow>
        <boxGeometry args={[0.025, 0.22, 0.04]} />
        <meshStandardMaterial color="#22252a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* 3. Monitor Bezel & Frame */}
      <group position={[0, 0.22, 0]}>
        {/* Outer Backing Casing */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.02, screenHeight + 0.02, screenWidth + 0.02]} />
          <meshStandardMaterial color="#141619" roughness={0.5} />
        </mesh>

        {/* Black Bezel Display Backplate (facing +X into the room) */}
        <mesh position={[0.0105, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* 4. Interactive 3D Screen Overlay */}
        <group position={[0.011, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={htmlScale}>
          <Html
            transform
            center
            style={{
              width: '800px',
              height: '500px',
              pointerEvents: 'auto',
            }}
          >
            <DesktopOS />
          </Html>
        </group>
      </group>
    </group>
  )
}