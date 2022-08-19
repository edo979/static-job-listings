import JobItem from './JobItem'
import './jobList.css'

function JobList({ jobs, dispatch }) {
  return (
    <ul className="job-list | flow" aria-label="job listings">
      {jobs.map((job) => (
        <JobItem data={job} key={job.id} dispatch={dispatch} />
      ))}
    </ul>
  )
}

export default JobList
