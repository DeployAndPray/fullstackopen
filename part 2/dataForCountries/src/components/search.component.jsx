export function Search({value, onChange }){
  return (
      <label>
        Find countries: <input type="text" value={value} onChange={onChange} />
      </label>
  )
}