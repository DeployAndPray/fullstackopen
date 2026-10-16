export function Stats({ good, neutral, bad }) {
  const all = good + neutral + bad;
  const avg = all === 0 ? 0 : (good - bad) / all;
  const pos = all === 0 ? 0 : (good / all) * 100;

  return (
    <p>
      Good : {good}
      <br />
      Neutral : {neutral}
      <br />
      Bad : {bad}
      <br />
      All : {all}
      <br />
      Average : {avg}
      <br />
      Positive : {pos}%
    </p>
  );
}
