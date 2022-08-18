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
  }, [categories])

  const addCategory = (category) => {
    if (categories.includes(category)) {
      return
    } else {
      setCategories((prevState) => [...prevState, category])
    }
  }

  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
      <JobList jobs={jobsFiltered} onAddCategory={addCategory} />
    </div>
  )
}

export default App
