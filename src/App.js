import { useEffect, useReducer, useState } from 'react'
import JobCategories from './components/JobCategories'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([]),
    [categories, setCategories] = useState([]),
    [jobsFiltered, setFilteredJobs] = useState([]),
    initialState = { categories: [], filteredJobs: [] }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('./data.json')

        if (!res.ok) {
          throw new Error('Network Error!')
        }

        const data = await res.json()
        setJobs(data)
        setFilteredJobs(data)

        console.log('fetched')
      } catch (error) {
        console.log(error)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    if (categories.length > 0) {
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

      setFilteredJobs(filteredjobs)
    } else {
      setFilteredJobs([...jobs])
    }
  }, [categories])

  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state, action) {
    switch (action.type) {
      case 'ADD-CATEGORY':
        if (categories.includes(action.payload)) {
          return state
        } else {
          return {
            categories: [...state.categories, action.payload],
            filteredJobs: state.filteredJobs,
          }
        }

      default:
        break
    }
  }

  // const addCategory = (category) => {
  //   if (categories.includes(category)) {
  //     return
  //   } else {
  //     setCategories((prevState) => [...prevState, category])
  //   }
  // }

  const removeCategoryFilters = () => setCategories([])

  const removeCategory = (categoryToRemove) =>
    setCategories((prevState) =>
      prevState.filter((category) => category !== categoryToRemove)
    )

  return (
    <div>
      {state.categories.length > 0 && (
        <JobCategories
          categories={state.categories}
          onRemoveCategory={removeCategory}
          onClear={removeCategoryFilters}
        />
      )}

      <JobList
        jobs={jobsFiltered}
        onAddCategory={(category) =>
          dispatch({ type: 'ADD-CATEGORY', payload: category })
        }
      />
    </div>
  )
}

export default App
