export function Total(props) {

  const total = props.parts.reduce( (acc, value) => acc +  value.exercises, 0 )
  return <p>Number of exercises {total}</p>;
}
