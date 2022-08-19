import './jobCategories.css'

function JobCategories({ categories, dispatch }) {
  return (
    <div className="job-categories | flex container">
      <ul className="categories | flex">
        {categories.map((category) => (
          <li key={category} className="categories_tablets">
            <span>{category}</span>
            <button
              onClick={() =>
                dispatch({
                  type: 'REMOVE-CATEGORY',
                  payload: category,
                })
              }
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'CLEAR-FILTER' })}>Clear</button>
    </div>
  )
}

export default JobCategories
