import { StatsLine } from "./StatsLine";

export function Stats({ good, neutral, bad }) {
  const all = good + neutral + bad;
  return all === 0 ? (
    <p>No feedback given</p>
  ) : (
    <StatsDisplay good={good} neutral={neutral} bad={bad} all={all} />
  );
}

export function StatsDisplay({ good, neutral, bad, all }) {
  const avg = all === 0 ? 0 : (good - bad) / all;
  const pos = all === 0 ? 0 : (good / all) * 100;
  return (
    <table>
      <tbody>
        <StatsLine text={"Good"} value={good} />
        <StatsLine text={"Neutral"} value={neutral} />
        <StatsLine text={"bad"} value={bad} />
        <StatsLine text={"All"} value={all} />
        <StatsLine text={"Average"} value={avg} />
        <StatsLine text={"Positive"} value={ `${pos}%` } />
      </tbody>
    </table>
  );
}
