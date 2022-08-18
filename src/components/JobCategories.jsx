import './jobCategories.css'

function JobCategories({ categories, onClear, onRemoveCategory }) {
  return (
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <div>
              <span>{category}</span>
              <button onClick={() => onRemoveCategory(category)}>X</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={onClear}>Clear</button>
    </div>
  )
}

export default JobCategories
