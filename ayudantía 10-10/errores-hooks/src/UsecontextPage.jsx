// UsecontextPage.jsx
//Hints al final de esta página
import { useContext, createContext, useState } from "react";

const MyContext = createContext();

function UsecontextPage() {
  const value = useContext(MyContext); 
  const [input, setInput] = useState;

  const handleChange = (e) => {
    setInput(e.target.value); 
  };

  return (
    <div>
      <h2>useContext</h2>
      <p>Valor del contexto: {value}</p>
      <input
        type="text"
        value={input}
        onChange={handleChange} 
      />
    </div>
  );
}

export default function UsecontextPageWrapper() {
  return (
    <MyContext.Provider>
      <UsecontextPage />
    </MyContext.Provider>
  );
}











//Hints:
// 1. Revisar proveedor del contexto
// 2. Revisar sintaxis de useState
// 3. Revisar uso de useContext
// 4. Revisar manejo del evento handleChange y si acaso es local o global