import {Item, CategoryId, categoryIds} from './utils'
import createStore from 'zustand'

type SimulatorState = {
  isDarkMode: boolean
  activeCategoryId: CategoryId | ''
  activeItems: {
    case?: Item,
    dial?: Item,
    hands?: Item,
    bezel?: Item,
    insert?: Item,
    chapter?: Item,
    strap?: Item,
  }
  setActiveCategory: (payload: CategoryId | '') => void
  setActiveItem: (payload: Item) => void
  filterUncompatibleItems: () => void
  toggleDarkMode: () => void
}

const useSimulator = createStore<SimulatorState>((set) => ({
  isDarkMode: false,
  activeCategoryId: '',
  activeItems: {},
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setActiveCategory: (payload) => set(() => ({ activeCategoryId: payload })),
  setActiveItem: (payload) => set((state) => {
    if (payload?.type) {
      const { activeItems } = JSON.parse(JSON.stringify(state))
      activeItems[payload.type] = payload
      return { activeItems }
    }
    return state
  }),
  filterUncompatibleItems: () => set((state) => {
    const { activeItems } = JSON.parse(JSON.stringify(state))
    const newValue : SimulatorState['activeItems'] = {}

    categoryIds.forEach(type => {
      const isDialFit = activeItems[type]?.dialDiameter && activeItems[type]?.dialDiameter === activeItems.case?.dialDiameter
      const isCompatible = activeItems[type]?.compatibility.includes(activeItems.case?.id)
      if(type === 'case' || isDialFit || isCompatible) newValue[type] = activeItems[type]
    })
    
    return {
      activeItems: newValue
    }
  }),
}))

export { useSimulator }