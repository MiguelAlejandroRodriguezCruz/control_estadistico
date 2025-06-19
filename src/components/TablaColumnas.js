import { useState } from 'react';

export default function TablaColumnas({ onCalcular }) {
    const [datos, setDatos] = useState([[""]]);
    const [numColumnas, setNumColumnas] = useState(1);

    const handleAgregarColumna = () => {
        if (numColumnas < 5) {
            setDatos(prev => prev.map(fila => [...fila, ""]));
            setNumColumnas(prev => prev + 1);
        }
    };

    const handleQuitarColumna = () => {
        if (numColumnas > 1) {
            setDatos(prev => prev.map(fila => fila.slice(0, -1)));
            setNumColumnas(prev => prev - 1);
        }
    };

    const handleAgregarFila = () => {
        setDatos(prev => [...prev, Array(numColumnas).fill("")]);
    };

    const handleQuitarFila = () => {
        if (datos.length > 1) {
            setDatos(prev => prev.slice(0, -1));
        }
    };

    const handleInputChange = (filaIndex, colIndex, valor) => {
        if (/^-?\d*\.?\d*$/.test(valor)) {
            const nuevosDatos = [...datos];
            nuevosDatos[filaIndex][colIndex] = valor;
            setDatos(nuevosDatos);
        }
    };

    const handleCalcular = () => {
        const datosNumericos = datos.map(fila =>
            fila.map(valor => parseFloat(valor)).filter(num => !isNaN(num))
        ).filter(fila => fila.length > 0);

        if (onCalcular) {
            onCalcular(datosNumericos);
        }
    };

    return (
        <div>
            <p>Datos a ingresar:</p>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <button onClick={handleAgregarColumna}>+ Columna</button>
                <button onClick={handleQuitarColumna}>- Columna</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${numColumnas}, 1fr)`, gap: '5px' }}>
                {datos.map((fila, filaIndex) =>
                    fila.map((valor, colIndex) => (
                        <input
                            key={`${filaIndex}-${colIndex}`}
                            type="text"
                            value={valor}
                            onChange={(e) => handleInputChange(filaIndex, colIndex, e.target.value)}
                            style={{ padding: '10px', textAlign: 'center' }}
                        />
                    ))
                )}
            </div>

            <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
                <button onClick={handleAgregarFila}>+ Fila</button>
                <button onClick={handleQuitarFila}>- Fila</button>
            </div>

            <div style={{ marginTop: '15px' }}>
                <button onClick={handleCalcular}>Calcular</button>
            </div>
        </div>
    );
}
