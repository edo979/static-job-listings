const JobReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return {
        ...state,
        filteredJobs: [...action.payload],
        jobs: [...action.payload],
      }

    case 'ADD-CATEGORY':
      if (state.categories.includes(action.payload)) {
        return state
      } else {
        const categories = [...state.categories, action.payload],
          filteredJobs = filterJobs(categories, state.jobs)

        return { ...state, categories, filteredJobs }
      }

    case 'REMOVE-CATEGORY':
      const categories = state.categories.filter(
          (category) => category !== action.payload
        ),
        filteredJobs = filterJobs(categories, state.jobs)
      return { ...state, categories, filteredJobs }

    case 'CLEAR-FILTER':
      return {
        categories: [],
        filteredJobs: [...state.jobs],
        jobs: state.jobs,
      }

    default:
      break
  }
}

function filterJobs(categories, jobs) {
  const filteredjobs = jobs.filter((job) => {
    const jobCategories = [job.role, job.level, ...job.languages, ...job.tools]

    let isIncludeCategory = true
    for (let i = 0; i < categories.length; i++) {
      if (jobCategories.includes(categories[i])) {
        continue
      } else {
        isIncludeCategory = false
        break
      }
    }

    return isIncludeCategory
  })

  return filteredjobs
}

export default JobReducer
