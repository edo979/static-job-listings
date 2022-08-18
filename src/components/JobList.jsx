import JobItem from './JobItem'
import './jobList.css'

function JobList({ jobs, onAddCategory }) {
  return (
    <ul className="job-list" aria-label="job listings">
      {jobs.map((job) => (
        <JobItem data={job} key={job.id} onAddCategory={onAddCategory} />
      ))}
    </ul>
  )
}

export default JobList
