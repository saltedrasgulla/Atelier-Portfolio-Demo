import { create } from 'zustand'

export const useElectricalStore = create((set) => ({
  // Switch 1: Under-desk warm task light
  taskLightOn: true,
  toggleTaskLight: () => set((state) => ({ taskLightOn: !state.taskLightOn })),

  // Switch 2: Ceiling fan / overhead light
  ceilingFanOn: false,
  toggleCeilingFan: () => set((state) => ({ ceilingFanOn: !state.ceilingFanOn })),
}))