//Hints al final de esta página
import { useEffect, useState } from "react";

function UseeffectPage() {
  const [count, setCount] = useState(0);


  useEffect(() => {
    setInterval(() => {
      setCount((prev) => prev + 1); 
    }, 1000);
  });

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>useEffect (Con Errores)</h2>
      <p>Contador automático: {count}</p>
      <p>
        ⚠️ Este componente reinicia su intervalo en cada render y no lo limpia.
        Con el tiempo, el contador se acelerará.
      </p>
    </div>
  );
}

export default UseeffectPage;























//Hints:
// 1. Revisar dependencias del useEffect
// 2. Revisar limpieza del efecto (cleanup)
// 3. Revisar si acaso el efecto debe correr siempre o solo una vez