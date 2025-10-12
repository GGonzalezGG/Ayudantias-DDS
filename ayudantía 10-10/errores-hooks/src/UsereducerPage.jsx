// UsereducerPage.jsx
//Hints al final de esta página
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  if (action.type === "increment") { 
    return {...state, count: state.count + 1};
  }
  return state;
}

function UsereducerPage() {
  const [state, dispatch] = useReducer(reducer); 

  return (
    <div>
      <h2>useReducer</h2>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ "increment" })}>Incrementar</button>
    </div>
  );
}

export default UsereducerPage;

















//Hints:
// 1. Revisar inicialización del useReducer
// 2. Revisar sintaxis del dispatch
