import JobItem from './JobItem'
import './jobList.css'

function JobList({ jobs }) {
  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <JobItem data={job} />
      ))}
    </ul>
  )
}

export default JobList
