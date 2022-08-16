import { useEffect, useState } from 'react'
import JobList from './components/JobList'

function App() {
  const [jobs, setJobs] = useState([])

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

  return (
    <div>
      <div>Filter:</div>
      <JobList jobs={jobs} />
    </div>
  )
}

export default App
