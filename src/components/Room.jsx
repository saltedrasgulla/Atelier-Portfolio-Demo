import * as THREE from 'three'
import WindowPanel from './WindowPanel'
import DeskWall from './DeskWall'

const ROOM_DIMS = {
  deskWallLength: 3.40,   // Left wall (Z-axis)
  windowWallWidth: 2.67,  // Right wall (X-axis)
  height: 2.90,           // Room height (Y-axis)
  wallColor: '#d8d2c6',
  floorColor: '#96897b'
}

export default function Room() {
  const { deskWallLength, windowWallWidth, height, wallColor, floorColor } = ROOM_DIMS

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Floor Plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[windowWallWidth / 2, 0, deskWallLength / 2]} 
        receiveShadow
      >
        <planeGeometry args={[windowWallWidth, deskWallLength]} />
        <meshStandardMaterial 
          color={floorColor} 
          roughness={0.4} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* 2. Window Wall (Right Wall - at Z = 0) */}
      <mesh 
        position={[windowWallWidth / 2, height / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[windowWallWidth, height]} />
        <meshStandardMaterial 
          color={wallColor} 
          roughness={0.7} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* 3. Desk Wall (Left Wall - at X = 0) */}
      <mesh 
        position={[0, height / 2, deskWallLength / 2]} 
        rotation={[0, Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[deskWallLength, height]} />
        <meshStandardMaterial 
          color={wallColor} 
          roughness={0.7} 
          side={THREE.DoubleSide} 
        />
      </mesh>

      {/* 4. Floor Grid Guide */}
      <gridHelper 
        args={[4, 8, '#4a463f', '#7d776a']} 
        position={[windowWallWidth / 2, 0.002, deskWallLength / 2]} 
      />

      {/* 5. Wall Features */}
      <WindowPanel />
      <DeskWall />
    </group>
  )
}