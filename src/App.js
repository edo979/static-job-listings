import { useEffect, useReducer } from 'react'
import JobCategories from './components/JobCategories'
import JobList from './components/JobList'
import JobReducer from './reducers/JobReducer'

function App() {
  const initialState = { categories: [], filteredJobs: [], jobs: [] },
    [state, dispatch] = useReducer(JobReducer, initialState)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('./data.json')

        if (!res.ok) {
          throw new Error('Network Error!')
        }

        const data = await res.json()

        dispatch({ type: 'INIT', payload: data })
        //console.log('fetched')
      } catch (error) {
        console.log(error)
      }
    }

    fetchJobs()
  }, [])

  return (
    <div className="main-container">
      {state.categories.length > 0 && (
        <JobCategories categories={state.categories} dispatch={dispatch} />
      )}

      <JobList jobs={state.filteredJobs} dispatch={dispatch} />
    </div>
  )
}

export default App
