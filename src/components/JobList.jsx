import JobItem from './JobItem'
import './jobList.css'

function JobList({ jobs }) {
  return (
    <ul className="job-list" role="list" aria-label="job listings">
      {jobs.map((job) => (
        <JobItem data={job} key={job.id} />
      ))}
    </ul>
  )
}

export default JobList
