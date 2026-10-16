import { Part } from "./Part"


export function Content(props) {
  return(
  <>
      <Part title={props.parts[0].name} total={props.parts[0].exercises} />
      <Part title={props.parts[1].name} total={props.parts[1].exercises} />
      <Part title={props.parts[2].name} total={props.parts[2].exercises} />
      <Part title={props.parts[3].name} total={props.parts[3].exercises} />
  </>
  )
}
