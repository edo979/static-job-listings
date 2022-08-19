import './jobCategories.css'

function JobCategories({ categories, dispatch }) {
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <div>
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
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch({ type: 'CLEAR-FILTER' })}>Clear</button>
    </div>
  )
}

export default JobCategories
