export function Content(props) {
  return(
  <>
    <p>
      {props.parts[0].title} {props.parts[0].total}
    </p>
    <p>
      {props.parts[1].title} {props.parts[1].total}
    </p>
    <p>
      {props.parts[2].title} {props.parts[2].total}
    </p>
  </>
  )
}
