import { Part } from "./Part";

export function Content({ parts }) {
  return parts.map((part) => (
    <Part key={part.id} title={part.name} total={part.exercises} />
  ));
}
