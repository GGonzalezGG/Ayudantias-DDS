import { useState, useEffect, useReducer, useContext, createContext } from 'react';


const ThemeContext = createContext();

// EJERCICIO 1: useState - Contador Simple
function Ejercicio1() {
  const [count, setCount] = useState(0);
  const { theme } = useContext(ThemeContext);

  return (
    <>
    <div className={`p-4 border rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className="font-bold mb-2">1. useState - Contador</h3>
      <p className="mb-2">Contador: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        Incrementar
      </button>
      <button 
        onClick={() => setCount(0)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>
    </div>
    </>
  );
}

// EJERCICIO 2: useEffect - Título de la página
function Ejercicio2() {
  const [nombre, setNombre] = useState('');
  
  useEffect(() => {
    document.title = nombre || 'Sin nombre';
  }, [nombre]);
  
  return (
    <div className="p-4 border rounded mb-4">
      <h3 className="font-bold mb-2">2. useEffect - Cambiar título</h3>
      <input 
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
        className="border px-3 py-2 rounded w-full"
      />
      <p className="mt-2 text-sm text-gray-600">
        El título de la pestaña cambia con tu nombre
      </p>
    </div>
  );
}

// EJERCICIO 3: useReducer - Lista de tareas
function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.task];
    case 'clear':
      return [];
    default:
      return state;
  }
}

function Ejercicio3() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [input, setInput] = useState('');
  
  const addTask = () => {
    if (input.trim()) {
      dispatch({ type: 'add', task: input });
      setInput('');
    }
  };
  
  return (
    <div className="p-4 border rounded mb-4 ">
      <h3 className="font-bold mb-2">3. useReducer - Lista de tareas</h3>
      <div className="flex gap-2 mb-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nueva tarea"
          className="border px-3 py-2 rounded flex-1"
        />
        <button 
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>
      <button 
        onClick={() => dispatch({ type: 'clear' })}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm mb-2"
      >
        Limpiar todo
      </button>
      <ul className="list-disc list-inside">
        {tasks.map((task, i) => <li key={i}>{task}</li>)}
      </ul>
    </div>
  );
}

// EJERCICIO 4: useContext - Tema claro/oscuro
function Ejercicio4() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`p-4 border rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className="font-bold mb-2">4. useContext - Tema</h3>
      <ThemeToggle />
      <ThemeDisplay />
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="bg-purple-500 text-white px-4 py-2 rounded mb-2"
    >
      Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
    </button>
  );
}

function ThemeDisplay() {
  const { theme } = useContext(ThemeContext);
  
  return <p>Tema actual: {theme}</p>;
}

// Componente principal
export default function App() {
  // Proveedor global de tema que comparten Ejercicio1 y Ejercicio4
  const [theme, setTheme] = useState('light');

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Ejercicios React Hooks</h1>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Ejercicio1 />
        <Ejercicio2 />
        <Ejercicio3 />
        <Ejercicio4 />
      </ThemeContext.Provider>
    </div>
  );
}             