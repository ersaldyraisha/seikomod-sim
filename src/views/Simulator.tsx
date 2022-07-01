import { useState, useEffect } from 'react'
import classNames from 'classnames'
import createStore from 'zustand'
import { getItems, getCategories, CategoryId, Item } from '../services'

const categoryIds : Array<CategoryId> = ['case' , 'dial' , 'bezel' , 'insert' , 'chapter' , 'strap', 'hands']

function Simulator() {
  return (
    <div className="flex flex-col h-[100vh] justify-between items-center">
      <TitleBar/>
      <Result />
      <Picker />
      <Navbar />
    </div>  
  )
}

type SimulatorState = {
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
}

const useSimulator = createStore<SimulatorState>((set) => ({
  activeCategoryId: '',
  activeItems: {},
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

function Navbar() {
  const navItems = getCategories()
  const activeNavId = useSimulator(state => state.activeCategoryId)
  const setActiveNav = useSimulator(state => state.setActiveCategory)
  
  const renderedNavItems = navItems.map(nav => (
    <li key={nav.id}>
      <button
        className={
          classNames(
            'px-3 py-1 rounded-full text-black font-bold cursor-pointer',
            { 'bg-blue-600 !text-white': activeNavId === nav.id },
          )
        }
        onClick={() => {
          if(activeNavId !== nav.id) setActiveNav(nav.id)
          else setActiveNav('')
        }}
      >
        {nav.name}
      </button>
    </li>
  ))
  
  return(
    <nav className="pb-10 pt-7">
      <ul className="flex justify-center bg-gray-100 gap-[20px] rounded-full p-2">
        {renderedNavItems}
      </ul>
    </nav>
  )
}

function Picker() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Array<Item>>([])
  
  const activeCategoryId = useSimulator(state => state.activeCategoryId)
  const activeItems = useSimulator(state => state.activeItems)
  const setActiveItem = useSimulator(state => state.setActiveItem)
  const filterUncompatibleItems = useSimulator(state => state.filterUncompatibleItems)

  useEffect(() => {
    if(activeCategoryId) {
      const newItems = getItems(activeCategoryId, activeItems.case?.id)
      setItems(newItems)
    } else {
      setItems([])
    }
  }, [activeCategoryId, activeItems])

  function handleItemSelect(item: Item) {
    setActiveItem(item)
    if(item.type === 'case') {
      filterUncompatibleItems()
    }
  }
  
  const renderedItems = items.slice((page - 1) * 7, page * 7)
    .map((item) => (
      <li 
        key={item.id}
        className={classNames(
          'flex flex-col shrink-0 py-2 rounded-lg text-center cursor-pointer w-[165px]',
          {'bg-blue-600 text-white': item.id === activeItems[activeCategoryId || 'case']?.id}
        )}
        onClick={() => handleItemSelect(item)}
      >
        <img src={item?.src} alt={item?.name} />
        <p className='font-bold'>{item?.name}</p>
        <p className='text-sm'>{item?.description}</p>
      </li>
    ))

  const isPrevActive = page > 1
  const isNextActive = page < (items?.length ?? 0) / 7

  return activeCategoryId ? (
    <div className="flex justify-center items-center gap-3 relative pt-4 min-h-[242px] border-t w-full">
      <button
        className="px-[20px] text-7xl text-gray-400 font-light disabled:opacity-20"
        disabled={!isPrevActive}
        onClick={() => { if(isPrevActive) setPage(page - 1)}}
        >
        &lsaquo;
      </button>

      <ul className="flex gap-2 w-[1200px]">
        {renderedItems.length > 0 ? renderedItems : activeItems.case ? (
          <p className="w-full text-center">No items.</p>
          ) : (
          <p className="w-full text-center">Select case first.</p>
        )}
      </ul>

      <button
        className="px-[20px] text-7xl text-gray-400 font-light disabled:opacity-20"
        disabled={!isNextActive}
        onClick={() => { if(isNextActive) setPage(page + 1) }}
      >
        &rsaquo;
      </button>
    </div>
  ) : null
}

function Result() {
  const activeItems = useSimulator(state => state.activeItems)

  const renderedResult = categoryIds.map(id => activeItems[id] ? (
    <img key={`result-${id}`} className='absolute inset w-full' src={activeItems[id]?.src} alt="result" />
  ) : null)

  return (
    <div className="grow flex items-center">
      <div className="relative w-[450px] h-[450px]">
        <div className="absolute inset w-[300px] h-[300px] top-[calc(50%-150px)] left-[calc(50%-150px)] bg-black rounded-full" />
        {renderedResult}
      </div>
    </div>
  )
}

function TitleBar() {
  const [isDarkModeActive, setDarkMode] = useState(false)

  return (
    <div className="flex fixed justify-between p-5 pb-0 w-[1200px]">
      <h1 className="text-blue-600 self-start">
        <span className='block text-xl leading-none'>
          The
        </span> 
        <span className='block text-3xl font-black leading-none'>
          SEIKONATOR
        </span> 
      </h1>
      <button onClick={() => setDarkMode(!isDarkModeActive)}>
        <div className={classNames(
          'flex bg-gray-300 p-1 rounded-full w-[35px]',
          {'!bg-blue-600 justify-end': !isDarkModeActive},
        )}>
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      </button>
    </div>
  )
}

export { Simulator }