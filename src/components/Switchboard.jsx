import { useRef } from 'react'
import { useElectricalStore } from '../store/useElectricalStore'

// Helper for realistic 3-pin socket hole cuts
function SocketHoles({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Top Earth Pin Hole */}
      <mesh position={[0, 0.016, 0.002]}>
        <cylinderGeometry args={[0.0045, 0.0045, 0.005, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Bottom-Left Neutral Pin Hole */}
      <mesh position={[-0.012, -0.012, 0.002]}>
        <cylinderGeometry args={[0.0035, 0.0035, 0.005, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
      {/* Bottom-Right Live Pin Hole */}
      <mesh position={[0.012, -0.012, 0.002]}>
        <cylinderGeometry args={[0.0035, 0.0035, 0.005, 12]} rotation={[Math.PI / 2, 0, 0]} />
        <meshBasicMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

// Individual clickable rocker switch that tilts when toggled
function RockerSwitch({ position, isOn, onToggle }) {
  const switchRef = useRef()

  return (
    <group position={position}>
      {/* Switch frame cutout recess */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.024, 0.05]} />
        <meshBasicMaterial color="#c0c0c0" />
      </mesh>

      {/* Rocker Key: tilts around X-axis depending on ON/OFF state */}
      <mesh
        ref={switchRef}
        position={[0, 0, 0.004]}
        rotation={[isOn ? -0.15 : 0.15, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[0.022, 0.046, 0.006]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} />
      </mesh>
    </group>
  )
}

export default function Switchboard({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { taskLightOn, toggleTaskLight, ceilingFanOn, toggleCeilingFan } = useElectricalStore()

  const plateColor = '#f2f2f0'

  return (
    <group position={position} rotation={rotation}>
      {/* ===================================================
          1. MODULAR FACEPLATE (North-West Style, Chamfered Edge)
          Width: 22cm, Height: 9cm, Depth: 8mm
          =================================================== */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.09, 0.008]} />
        <meshStandardMaterial color={plateColor} roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Inner Recessed Face Insert */}
      <mesh position={[0, 0, 0.0042]}>
        <planeGeometry args={[0.205, 0.076]} />
        <meshStandardMaterial color="#eaeaea" roughness={0.35} />
      </mesh>

      {/* ===================================================
          2. LEFT MODULE: 3-PIN PLUG SOCKET
          =================================================== */}
      <group position={[-0.065, 0, 0.005]}>
        <mesh>
          <planeGeometry args={[0.042, 0.046]} />
          <meshStandardMaterial color="#f7f7f7" roughness={0.3} />
        </mesh>
        <SocketHoles />
      </group>

      {/* ===================================================
          3. CENTER MODULE: 2 ROCKER SWITCHES
          =================================================== */}
      {/* Switch 1 (Left key: Task Light) */}
      <RockerSwitch
        position={[-0.014, 0, 0.005]}
        isOn={taskLightOn}
        onToggle={toggleTaskLight}
      />

      {/* Switch 2 (Right key: Ceiling Fan / Main Light) */}
      <RockerSwitch
        position={[0.014, 0, 0.005]}
        isOn={ceilingFanOn}
        onToggle={toggleCeilingFan}
      />

      {/* ===================================================
          4. RIGHT MODULE: 3-PIN PLUG SOCKET
          =================================================== */}
      <group position={[0.065, 0, 0.005]}>
        <mesh>
          <planeGeometry args={[0.042, 0.046]} />
          <meshStandardMaterial color="#f7f7f7" roughness={0.3} />
        </mesh>
        <SocketHoles />
      </group>
    </group>
  )
}