import { useEffect, useReducer, useState } from 'react'
import JobCategories from './components/JobCategories'
import JobList from './components/JobList'

function App() {
  const initialState = { categories: [], filteredJobs: [], jobs: [] },
    [state, dispatch] = useReducer(reducer, initialState)

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

  function reducer(state, action) {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          filteredJobs: [...action.payload],
          jobs: [...action.payload],
        }

      case 'ADD-CATEGORY':
        if (state.categories.includes(action.payload)) {
          return state
        } else {
          const categories = [...state.categories, action.payload],
            filteredJobs = filterJobs(categories, state.jobs)

          return { ...state, categories, filteredJobs }
        }

      case 'CLEAR-FILTER':
        return {
          categories: [],
          filteredJobs: [...state.jobs],
          jobs: state.jobs,
        }

      default:
        break
    }
  }

  function filterJobs(categories, jobs) {
    const filteredjobs = jobs.filter((job) => {
      const jobCategories = [
        job.role,
        job.level,
        ...job.languages,
        ...job.tools,
      ]

      let isIncludeCategory = true
      for (let i = 0; i < categories.length; i++) {
        if (jobCategories.includes(categories[i])) {
          continue
        } else {
          isIncludeCategory = false
          break
        }
      }

      return isIncludeCategory
    })

    return filteredjobs
  }

  const removeCategory = (categoryToRemove) => console.log('jah')
  // setCategories((prevState) =>
  //   prevState.filter((category) => category !== categoryToRemove)
  // )

  return (
    <div>
      {state.categories.length > 0 && (
        <JobCategories
          categories={state.categories}
          //onRemoveCategory={removeCategory}
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
