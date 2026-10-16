import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { index: 1, name: "Fundamentals of React", exercises: 10 },
      { index: 2, name: "Using props to pass data", exercises: 7 },
      { index: 3, name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
