import './jobItem.css'
function JobItem({ data: { id, company, logo } }) {
  return (
    <li key={id}>
      <div className="job">
        <div className="job_logo">
          <img src={logo} alt="" />
        </div>
        <div className="job_info">{company}</div>
        <div className="job_filter-list"></div>
      </div>
    </li>
  )
}

export default JobItem
