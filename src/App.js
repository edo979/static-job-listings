import { useEffect, useState } from 'react'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([]),
    [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('./data.json')

        if (!res.ok) {
          throw new Error('Network Error!')
        }

        const data = await res.json()
        setJobs(data)

        console.log('fetched')
      } catch (error) {
        console.log(error)
      }
    }

    fetchJobs()
  }, [])

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
      <JobList jobs={jobs} onAddCategory={addCategory} />
    </div>
  )
}

export default App
