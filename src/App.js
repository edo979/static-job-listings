import { useEffect, useReducer, useState } from 'react'
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
    <div>
      {state.categories.length > 0 && (
        <JobCategories
          categories={state.categories}
          onRemoveCategory={(category) =>
            dispatch({ type: 'REMOVE-CATEGORY', payload: category })
          }
          onClear={() => dispatch({ type: 'CLEAR-FILTER' })}
        />
      )}

      <JobList
        jobs={state.filteredJobs}
        onAddCategory={(category) =>
          dispatch({ type: 'ADD-CATEGORY', payload: category })
        }
      />
    </div>
  )
}

export default App
