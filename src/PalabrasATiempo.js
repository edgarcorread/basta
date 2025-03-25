import React, { useState, useEffect } from 'react';

const PalabrasATiempo = () => {
  const [tiempo, setTiempo] = useState(10); // 10 segundos
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [letraSeleccionada, setLetraSeleccionada] = useState(null);
  const [letrasUsadas, setLetrasUsadas] = useState([]);
  const [victoria, setVictoria] = useState(false);

  // Lista de letras para el juego
  const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];

  // Temporizador
  useEffect(() => {
    let intervalo = null;
    
    if (juegoActivo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo(tiempoAnterior => tiempoAnterior - 1);
      }, 1000);
    } else if (tiempo === 0) {
      setJuegoActivo(false);
    }
    
    return () => clearInterval(intervalo);
  }, [juegoActivo, tiempo]);

  // Iniciar el juego
  const iniciarJuego = () => {
    setTiempo(30);
    setJuegoActivo(true);
    setLetrasUsadas([]);
    setLetraSeleccionada(null);
    setVictoria(false);
  };

  // Reiniciar juego
  const reiniciarJuego = () => {
    setJuegoActivo(false);
    setTiempo(30);
    setLetrasUsadas([]);
    setLetraSeleccionada(null);
    setVictoria(false);
  };

  // Seleccionar una letra
  const seleccionarLetra = (letra) => {
    if (!juegoActivo || letrasUsadas.includes(letra) || victoria) return;
    
    setLetraSeleccionada(letra);
  };

  // Confirmar selección
  const confirmarSeleccion = () => {
    if (!juegoActivo || !letraSeleccionada) return;
    
    const nuevasLetrasUsadas = [...letrasUsadas, letraSeleccionada];
    setLetrasUsadas(nuevasLetrasUsadas);
    setLetraSeleccionada(null);
    
    // Reiniciar el contador a 30 segundos
    setTiempo(30);
    
    // Verificar victoria
    if (nuevasLetrasUsadas.length === letras.length) {
      setVictoria(true);
      setJuegoActivo(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg">
      
      
      {/* Temporizador y estado del juego */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          Tiempo: <span className={tiempo < 10 ? "text-red-600" : "text-blue-600"}>{tiempo}</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={iniciarJuego} 
            disabled={juegoActivo}
            className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-400"
          >
            {juegoActivo ? "Juego en curso" : "Iniciar"}
          </button>
          <button 
            onClick={reiniciarJuego} 
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Reiniciar
          </button>
        </div>
      </div>
      
      {/* Mensaje de victoria */}
      {victoria && (
        <div className="mb-4 p-2 bg-yellow-300 text-center rounded-md">
          <p className="text-xl font-bold text-green-800">¡VICTORIA! Has usado todas las letras.</p>
          <p>Presiona "Iniciar" para jugar de nuevo.</p>
        </div>
      )}
      
      {/* Letra seleccionada */}
      <div className="mb-4 flex items-center justify-center">
        <div className="text-xl font-bold">
          Letra seleccionada: <span className="text-purple-700">{letraSeleccionada || '-'}</span>
        </div>
      </div>
      
      {/* Contador de letras usadas */}
      <div className="mb-4 text-center">
        <p>Letras usadas: {letrasUsadas.length} de {letras.length}</p>
      </div>
      
      {/* Círculo de letras */}
      <div className="relative w-72 h-72 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 border-gray-300 bg-white"></div>
        
        {/* Botón Confirmar en el centro */}
        <button
          onClick={confirmarSeleccion}
          disabled={!juegoActivo || !letraSeleccionada}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shadow-lg disabled:bg-gray-400 disabled:shadow-none"
        >
          Confirmar
        </button>
        
        {letras.map((letra, index) => {
          const angle = (index * (360 / letras.length)) * (Math.PI / 180);
          const radius = 120; // Radio del círculo
          const x = Math.cos(angle) * radius + 144; // 144 es la mitad del contenedor (288/2)
          const y = Math.sin(angle) * radius + 144;
          
          const usada = letrasUsadas.includes(letra);
          const seleccionada = letraSeleccionada === letra;
          
          return (
            <button
              key={letra}
              onClick={() => seleccionarLetra(letra)}
              disabled={!juegoActivo || usada || victoria}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transform -translate-x-5 -translate-y-5
                ${usada ? 'bg-gray-300 text-gray-500' : 
                  seleccionada ? 'bg-yellow-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'}
                ${(!juegoActivo || victoria) && 'opacity-70'}
              `}
              style={{
                left: `${x}px`,
                top: `${y}px`,
              }}
            >
              {letra}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PalabrasATiempo;
