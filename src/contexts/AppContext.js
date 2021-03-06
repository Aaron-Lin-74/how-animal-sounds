import React, { useContext, useEffect, useReducer } from 'react'
import { query, orderBy, limit, where } from 'firebase/firestore'
import { animalsRef, getDocs } from '../firebase'

const AppContext = React.createContext()

const initialState = {
  animals: [],
  loading: false,
  animalType: '',
  searchTerm: '',
}

// Avoid hardcoded action strings, to reduce the bugs
export const ACTIONS = {
  SET_ANIMALS: 'SET_ANIMALS',
  OPEN_LOADING: 'OPEN_LOADING',
  CLOSE_LOADING: 'CLOSE_LOADING',
  SET_SEARCHTERM: 'SET_SEARCHTERM',
  SET_ANIMALTYPE: 'SET_ANIMALTYPE',
}

// Action creators
export const setAnimals = (animals) => ({
  type: ACTIONS.SET_ANIMALS,
  payload: { animals },
})

export const openLoading = () => ({
  type: ACTIONS.OPEN_LOADING,
})

export const closeLoading = () => ({
  type: ACTIONS.CLOSE_LOADING,
})

export const setSearchTerm = (searchTerm) => ({
  type: ACTIONS.SET_SEARCHTERM,
  payload: { searchTerm },
})

export const setAnimalType = (animalType) => ({
  type: ACTIONS.SET_ANIMALTYPE,
  payload: { animalType },
})

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ANIMALS:
      return { ...state, animals: action.payload.animals }
    case ACTIONS.OPEN_LOADING:
      document.body.style.setProperty('overflow', 'hidden', 'important')
      return { ...state, loading: true }
    case ACTIONS.CLOSE_LOADING:
      document.body.style.setProperty('overflow', 'visible', 'important')
      return { ...state, loading: false }
    case ACTIONS.SET_SEARCHTERM:
      return { ...state, searchTerm: action.payload.searchTerm }
    case ACTIONS.SET_ANIMALTYPE:
      return { ...state, animalType: action.payload.animalType }
    default:
      return state
  }
}
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Fetch the animals from server when animalType changes
  useEffect(() => {
    const loadAnimals = async (animalQuery) => {
      dispatch(openLoading())
      try {
        const querySnapshot = await getDocs(animalQuery)
        const result = []
        querySnapshot.forEach((doc) => {
          result.push(doc.data())
        })
        dispatch(setAnimals(result))
      } catch (err) {
        console.log(err)
      } finally {
        dispatch(closeLoading())
      }
    }
    const animalQuery = query(animalsRef, orderBy('name', 'desc'), limit(100))
    const animalQueryByType = query(
      animalsRef,
      where('type', '==', state.animalType),
      orderBy('name', 'desc'),
      limit(16)
    )
    const q = state.animalType === '' ? animalQuery : animalQueryByType
    loadAnimals(q)
  }, [state.animalType])

  return (
    <AppContext.Provider
      /* eslint-disable-next-line react/jsx-no-constructed-context-values */
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)

export { AppContext, AppProvider }
