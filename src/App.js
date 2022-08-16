import { useEffect, useState } from 'react'

function App() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch('data.json')
      const data = await res.json()

      setJobs(data)
      console.log('fetched')
    }

    fetchJobs()
  }, [])

  return (
    <ul>
      {jobs.map((job) => (
        <li key={job.id}>{job.company}</li>
      ))}
    </ul>
  )
}

export default App
