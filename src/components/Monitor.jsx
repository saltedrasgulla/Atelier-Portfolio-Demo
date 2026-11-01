import { Html } from '@react-three/drei'
import DesktopOS from './DesktopOS'

export default function Monitor({ position = [0, 0, 0] }) {
  // 18-inch Monitor CAD Specs: 457mm total width (0.457m)
  const totalWidth = 0.457
  const totalHeight = 0.265
  const bezelThickness = 0.016
  const screenCenterY = 0.215

  return (
    <group position={position}>
      {/* 67mm from switchboard wall (x = 0.01), 15mm from left edge (z = 0.13), 60° angle */}
      <group 
        position={[0.01, -0.018, 0.13]} 
        rotation={[0, (2 * Math.PI) / 3, 0]}
      >
        
        {/* 1. Monitor Flat Base */}
        <mesh position={[0, 0.005, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.19, 0.01, 0.14]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* 2. Monitor Stand Neck */}
        <mesh position={[0, 0.055, -0.025]} castShadow receiveShadow>
          <boxGeometry args={[0.04, 0.10, 0.02]} />
          <meshStandardMaterial color="#0a0a0c" roughness={0.4} metalness={0.6} />
        </mesh>
{/* 3. Outer Monitor Casing (457mm wide x 265mm tall) */}
        <mesh position={[0, screenCenterY, 0]} castShadow receiveShadow>
          <boxGeometry args={[totalWidth, totalHeight, bezelThickness]} />
          <meshStandardMaterial color="#050507" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* 3b. Opaque Screen Backing Panel (Blocks HTML bleed-through) */}
        <mesh position={[0, screenCenterY, bezelThickness / 2]}>
          <planeGeometry args={[totalWidth - 0.01, totalHeight - 0.01]} />
          <meshBasicMaterial color="#050507" />
        </mesh>

        {/* 4. Calibrated HTML OS Screen */}
        <Html
          transform
          occlude="blending" // Uses WebGL masking instead of raycasting so it layers perfectly behind UI and other meshes
          zIndexRange={[100, 0]} // Forces the 3D screen to render below your standard z-index: 1000 modals
          position={[0.004, screenCenterY, bezelThickness / 2 + 0.001]}
          scale={0.0195}
        >
          <style>{`
            .monitor-os-frame > * {
              width: 100% !important;
              height: 100% !important;
              max-width: none !important;
              max-height: none !important;
              margin: 0 !important;
              box-sizing: border-box !important;
            }
          `}</style>
          <div
            className="monitor-os-frame"
            style={{
              width: '880px',
              height: '495px',
              overflow: 'hidden',
              background: '#0d1117',
              userSelect: 'none'
            }}
          >
            <DesktopOS />
          </div>
        </Html>

      </group>
    </group>
  )
}