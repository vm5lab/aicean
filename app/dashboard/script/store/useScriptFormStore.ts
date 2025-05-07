import { create } from 'zustand'

type ScriptFormState = {
  title: string
  description?: string
  content?: any
  setField: (field: string, value: any) => void
}

export const useScriptFormStore = create<ScriptFormState>((set) => ({
  title: '',
  description: '',
  content: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
})) 