import React, { useState, useEffect, useReducer } from 'react';
import './App.css';

// ============================================
// COMPONENTE 1: useState - Contador Simple
// ============================================
function ContadorSimple() {
  const [contador, setContador] = useState(0);
  const [paso, setPaso] = useState(1);

  return (
    <div style={{ padding: '20px', border: '2px solid #3498db', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Contador: {contador}</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Incrementar de a: </label>
        <input 
          type="number" 
          value={paso} 
          onChange={(e) => setPaso(Number(e.target.value))}
          style={{ width: '60px', marginLeft: '10px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setContador(contador + paso)}>
          Incrementar +{paso}
        </button>
        <button onClick={() => setContador(contador - paso)}>
          Decrementar -{paso}
        </button>
        <button onClick={() => setContador(0)}>
          Resetear
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
        <p><strong>Conceptos clave:</strong></p>
        <ul>
          <li>useState retorna [valor, función_actualizadora]</li>
          <li>Cada setState causa un re-render del componente</li>
          <li>El estado es local al componente</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE 2: useEffect - Temporizador
// ============================================
function Temporizador() {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [titulo, setTitulo] = useState('Temporizador');

  // Effect para el temporizador
  useEffect(() => {
    let intervalo = null;
    
    if (activo) {
      intervalo = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [activo]);

  // Effect para actualizar el título del documento
  useEffect(() => {
    document.title = `${titulo} - ${segundos}s`;
    
    return () => {
      document.title = 'React App';
    };
  }, [segundos, titulo]);

  const formatearTiempo = (seg) => {
    const mins = Math.floor(seg / 60);
    const secs = seg % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #2ecc71', borderRadius: '8px', maxWidth: '400px', margin: '0 auto' }}>
      <input 
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        style={{ marginBottom: '15px', padding: '5px', width: '100%' }}
        placeholder="Nombre del temporizador"
      />
      
      <h2 style={{ fontSize: '48px', margin: '20px 0' }}>
        {formatearTiempo(segundos)}
      </h2>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={() => setActivo(!activo)}>
          {activo ? 'Pausar' : 'Iniciar'}
        </button>
        <button onClick={() => { setSegundos(0); setActivo(false); }}>
          Resetear
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
        <p><strong>Conceptos clave:</strong></p>
        <ul>
          <li>useEffect se ejecuta después de cada render</li>
          <li>Array de dependencias controla cuándo se re-ejecuta</li>
          <li>Cleanup function previene memory leaks</li>
          <li>[] vacío = solo al montar, undefined = cada render</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE 3: useReducer - Carrito de Compras
// ============================================

// Reducer: función pura que recibe (estado, acción) y retorna nuevo estado
function carritoReducer(estado, accion) {
  switch (accion.type) {
    case 'AGREGAR_ITEM':
      const itemExistente = estado.items.find(item => item.id === accion.payload.id);
      
      if (itemExistente) {
        return {
          ...estado,
          items: estado.items.map(item =>
            item.id === accion.payload.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        };
      }
      
      return {
        ...estado,
        items: [...estado.items, { ...accion.payload, cantidad: 1 }]
      };

    case 'ELIMINAR_ITEM':
      return {
        ...estado,
        items: estado.items.filter(item => item.id !== accion.payload)
      };

    case 'INCREMENTAR':
      return {
        ...estado,
        items: estado.items.map(item =>
          item.id === accion.payload
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      };

    case 'DECREMENTAR':
      return {
        ...estado,
        items: estado.items.map(item =>
          item.id === accion.payload && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      };

    case 'VACIAR_CARRITO':
      return { items: [] };

    default:
      return estado;
  }
}

function CarritoCompras() {
  const estadoInicial = { items: [] };
  const [carrito, dispatch] = useReducer(carritoReducer, estadoInicial);
  const [nombreProducto, setNombreProducto] = useState('');
  const [precio, setPrecio] = useState('');

  const agregarProducto = () => {
    if (nombreProducto && precio) {
      dispatch({
        type: 'AGREGAR_ITEM',
        payload: {
          id: Date.now(),
          nombre: nombreProducto,
          precio: parseFloat(precio)
        }
      });
      setNombreProducto('');
      setPrecio('');
    }
  };

  const calcularTotal = () => {
    return carrito.items.reduce((total, item) => 
      total + (item.precio * item.cantidad), 0
    ).toFixed(2);
  };

  return (
    <div style={{ padding: '20px', border: '2px solid #e74c3c', borderRadius: '8px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Carrito de Compras</h2>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Producto"
          value={nombreProducto}
          onChange={(e) => setNombreProducto(e.target.value)}
          style={{ flex: '2 1 150px', padding: '8px' }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          style={{ flex: '1 1 80px', padding: '8px' }}
        />
        <button onClick={agregarProducto} style={{ padding: '8px 16px' }}>
          Agregar
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        {carrito.items.length === 0 ? (
          <p style={{ color: '#999' }}>El carrito está vacío</p>
        ) : (
          carrito.items.map(item => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <span style={{ flex: '1 1 100px' }}>{item.nombre}</span>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button onClick={() => dispatch({ type: 'DECREMENTAR', payload: item.id })}>
                  -
                </button>
                <span>{item.cantidad}</span>
                <button onClick={() => dispatch({ type: 'INCREMENTAR', payload: item.id })}>
                  +
                </button>
                <span style={{ minWidth: '60px', textAlign: 'right' }}>
                  ${(item.precio * item.cantidad).toFixed(2)}
                </span>
                <button 
                  onClick={() => dispatch({ type: 'ELIMINAR_ITEM', payload: item.id })}
                  style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ borderTop: '2px solid #333', paddingTop: '15px' }}>
        <h3>Total: ${calcularTotal()}</h3>
        <button 
          onClick={() => dispatch({ type: 'VACIAR_CARRITO' })}
          disabled={carrito.items.length === 0}
          style={{ marginTop: '10px' }}
        >
          Vaciar Carrito
        </button>
      </div>

      <div style={{ marginTop: '15px', fontSize: '14px', color: '#555', textAlign: 'left' }}>
        <p><strong>Conceptos clave:</strong></p>
        <ul>
          <li>useReducer es ideal para estado complejo con múltiples sub-valores</li>
          <li>Reducer es una función pura: (estado, acción) → nuevo estado</li>
          <li>dispatch envía acciones al reducer</li>
          <li>Mejor que useState para lógica de actualización compleja</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL - APP
// ============================================
function App() {
  const [componenteActivo, setComponenteActivo] = useState('contador');

  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#9c9c9cff', 
      padding: '20px' 
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>
          Ayudantía React Hooks
        </h1>
        <p style={{ margin: '0', color: '#666' }}>
          Ejemplos prácticos de useState, useEffect y useReducer
        </p>
      </header>

      {/* Navegación entre componentes */}
      <nav style={{ 
        display: 'flex', 
        gap: '10px', 
        justifyContent: 'center', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <button 
          onClick={() => setComponenteActivo('contador')}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: componenteActivo === 'contador' ? '#3498db' : '#ecf0f1',
            color: componenteActivo === 'contador' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: componenteActivo === 'contador' ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}
        >
          1. useState
        </button>
        <button 
          onClick={() => setComponenteActivo('temporizador')}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: componenteActivo === 'temporizador' ? '#2ecc71' : '#ecf0f1',
            color: componenteActivo === 'temporizador' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: componenteActivo === 'temporizador' ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}
        >
          2. useEffect
        </button>
        <button 
          onClick={() => setComponenteActivo('carrito')}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: componenteActivo === 'carrito' ? '#e74c3c' : '#ecf0f1',
            color: componenteActivo === 'carrito' ? 'white' : '#333',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: componenteActivo === 'carrito' ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}
        >
          3. useReducer
        </button>
      </nav>

      {/* Renderizado condicional de componentes */}
      <main style={{ maxWidth: '600px', margin: '0 auto' }}>
        {componenteActivo === 'contador' && <ContadorSimple />}
        {componenteActivo === 'temporizador' && <Temporizador />}
        {componenteActivo === 'carrito' && <CarritoCompras />}
      </main>

      {/* Footer con información */}
      <footer style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        padding: '20px',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>💡 Tip: Revisa la consola del navegador para ver el comportamiento de los hooks</p>
      </footer>
    </div>
  );
}

export default App;