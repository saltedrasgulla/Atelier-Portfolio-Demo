//import * as THREE from 'three'

// DELETE THIS LINE:
// import * as THREE from 'three'

export default function WindowPanel() {
  return (
    <group position={[0, 0, 0.015]}>
      {/* ... rest of the file remains exactly as is ... */}
      {/* =========================================
          1. BALCONY DOOR (Left side)
          Spans X: 0.09m to 0.89m
          ========================================= */}
      {/* Door Leaf */}
      <mesh position={[0.49, 1.05, 0]}>
        <planeGeometry args={[0.8, 2.1]} />
        <meshStandardMaterial color="#dedede" roughness={0.4} />
      </mesh>

      {/* Door Handle */}
      <mesh position={[0.82, 1.0, 0.02]}>
        <boxGeometry args={[0.03, 0.12, 0.02]} />
        <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Door Transom Glass (Above door) */}
      <mesh position={[0.49, 2.35, 0]}>
        <planeGeometry args={[0.78, 0.4]} />
        <meshPhysicalMaterial
          color="#c8e4f5"
          transparent
          opacity={0.5}
          roughness={0.1}
          transmission={0.85}
          thickness={0.02}
        />
      </mesh>

      {/* Transom Frame border */}
      <mesh position={[0.49, 2.35, -0.005]}>
        <planeGeometry args={[0.82, 0.44]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.5} />
      </mesh>

      {/* =========================================
          2. WINDOW 1 (Middle / Clear Glass)
          Spans X: 1.0m to 1.56m
          ========================================= */}
      <group position={[1.28, 1.6, 0]}>
        {/* Frame Outline */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[0.56, 1.72]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Glass */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[0.5, 1.66]} />
          <meshPhysicalMaterial
            color="#badef5"
            transparent
            opacity={0.4}
            roughness={0.05}
            transmission={0.9}
            thickness={0.02}
          />
        </mesh>
        {/* Divider bar */}
        <mesh position={[0, 0.55, 0.01]}>
          <boxGeometry args={[0.5, 0.03, 0.015]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      {/* =========================================
          3. WINDOW 2 (Right / Dark Mosquito Mesh)
          Spans X: 1.86m to 2.42m
          ========================================= */}
      <group position={[2.14, 1.6, 0]}>
        {/* Frame Outline */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[0.56, 1.72]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        {/* Dark Mesh Screen */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[0.5, 1.66]} />
          <meshStandardMaterial
            color="#2a3036"
            transparent
            opacity={0.7}
            roughness={0.9}
          />
        </mesh>
        {/* Divider bar */}
        <mesh position={[0, 0.55, 0.01]}>
          <boxGeometry args={[0.5, 0.03, 0.015]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>

      {/* Window Sill Shelf under both windows */}
      <mesh position={[1.71, 0.73, 0.03]}>
        <boxGeometry args={[1.45, 0.04, 0.06]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* =========================================
          4. CURTAIN ROD & OLIVE-GREEN DRAPES
          ========================================= */}
      {/* Curtain Rod spanning across the wall (length 2.6m) */}
      <mesh position={[1.37, 2.65, 0.05]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, 2.6, 16]} />
        <meshStandardMaterial color="#cccccc" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Left Curtain Stack (Folded next to the corner/door) */}
      <mesh position={[0.05, 1.5, 0.06]}>
        <boxGeometry args={[0.08, 2.3, 0.05]} />
        <meshStandardMaterial color="#73893c" roughness={0.8} />
      </mesh>

      {/* Center Curtain Stack (Hanging between Window 1 and Window 2) */}
      <mesh position={[1.71, 1.5, 0.06]}>
        <boxGeometry args={[0.2, 2.3, 0.05]} />
        <meshStandardMaterial color="#73893c" roughness={0.8} />
      </mesh>
    </group>
  )
}