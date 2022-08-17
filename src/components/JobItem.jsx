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
    <li aria-label="job">
      <article className="job | flex" aria-label="job information">
        <aside className="job_logo" aria-hidden="true">
          <img src={logo} alt="" />
        </aside>

        <section
          className="job_info | flex"
          aria-label="job name, position, location"
        >
          <header className="job_header | flex">
            <h2>{company}</h2>
            {data.new && <span className="badge badge-accent">New!</span>}

            {featured && <span className="badge badge-dark">Featured</span>}
          </header>
          <main className="job_position">{position}</main>
          <footer className="job_footer | flex"></footer>
        </section>

        <section aria-label="click categories to filter">
          <ul
            className="category-list | flex"
            role="list"
            aria-label="categories"
          >
            {categoryList.map((category, i) => (
              <li className="category-list_item" key={i} aria-label="category">
                <button className="btn btn-category">{category}</button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </li>
  )
}

export default JobItem
