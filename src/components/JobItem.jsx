import './jobItem.css'
function JobItem({ data, dispatch }) {
  const {
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
          <footer className="job_footer | flex">
            <p>{postedAt}</p>
            <p>{contract}</p>
            <p>{location}</p>
          </footer>
        </section>

        <section aria-label="click categories to filter">
          <ul className="category-list | flex" aria-label="categories">
            {categoryList.map((category) => (
              <li
                className="category-list_item"
                key={category}
                aria-label="category"
              >
                <button
                  className="btn btn-category"
                  onClick={() =>
                    dispatch({ type: 'ADD-CATEGORY', payload: category })
                  }
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </li>
  )
}

export default JobItem
