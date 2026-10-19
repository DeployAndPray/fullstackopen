export function List({ list }){
  
  return(
    <>
    <ul>
      { list.map(country => <li key={country.name.common}>{ country.name.common }</li> ) }
    </ul>
    </>
  )
}