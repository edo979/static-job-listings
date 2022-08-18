import { useEffect, useState } from 'react'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([]),
    [categories, setCategories] = useState([]),
    [jobsFiltered, setFilteredJobs] = useState([])

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

  const addCategory = (category) => {
    if (categories.includes(category)) {
      return
    } else {
      setCategories((prevState) => [...prevState, category])
    }
  }

  const removeCategoryFilters = () => setCategories([])

  const removeCategory = (categoryToRemove) =>
    setCategories((prevState) =>
      prevState.filter((category) => category != categoryToRemove)
    )

  return (
    <div>
      {categories.length > 0 && (
        <div>
          <ul>
            {categories.map((category) => (
              <li key={category}>
                <div>
                  <span>{category}</span>
                  <button onClick={() => removeCategory(category)}>X</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={removeCategoryFilters}>Clear</button>
        </div>
      )}

      <JobList jobs={jobsFiltered} onAddCategory={addCategory} />
    </div>
  )
}

export default App
