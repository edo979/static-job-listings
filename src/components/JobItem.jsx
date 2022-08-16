function JobItem({ data }) {
  return <li key={data.id}>{data.company}</li>
}

export default JobItem
