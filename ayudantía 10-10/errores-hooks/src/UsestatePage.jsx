// UsestatePage.jsx
//Hints al final de esta página
import React, { useState } from "react";

function UsestatePage() {
  for (let i = 0; i < 1000000; i++) {
    const [count, setCount] = useState();
  }

  function incrementar() {
    count = count + 1; 
  }

  return (
    <div>
      <h2>useState</h2>
      <p>Contador: {count}</p>
      <button onClick={incrementar}>Incrementar</button>
    </div>
  );
}

export default UsestatePage;






















//Hints:
// 1. Revisar sintaxis de useState  
// 2. Revisar ubicacion de useState (dentro de loops o condicionales)
// 3. Revisar si se está modificando el estado directamente o a través del setter

