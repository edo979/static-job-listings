import './jobItem.css'
function JobItem({ data }) {
  const {
      id,
      company,
      logo,
      featured,
      position,
      role,
      level,
      postedAt,
      contract,
      location,
      languages,
      tools,
    } = data,
    categoryList = [role, level, ...languages, ...tools]

  return (
    <li>
      <div className="job | flex">
        <div className="job_logo">
          <img src={logo} alt="" />
        </div>
        <div className="job_info">{company}</div>
        <ul className="category-list | flex">
          {categoryList.map((category, i) => (
            <li className="category-list_item" key={i}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default JobItem
