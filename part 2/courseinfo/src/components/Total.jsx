export function Total({ parts }) {

  const total = parts.reduce( (acc, value) => acc +  value.exercises, 0 )
  return <p>Total of {total} exercises</p>;
}
