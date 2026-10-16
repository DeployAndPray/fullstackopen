export function Title({text, size}){
  
  switch(size){
    case 2 : return <h2>{ text }</h2>
    default : return <h1>{ text }</h1>
  }
}