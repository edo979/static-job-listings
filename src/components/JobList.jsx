import JobItem from './JobItem'

function JobList({ jobs }) {
  return (
    <ul>
      {jobs.map((job) => (
        <JobItem data={job} />
      ))}
    </ul>
  )
}

export default JobList
