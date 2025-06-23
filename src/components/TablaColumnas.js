import { useState } from 'react';
import classNames from 'classnames';
import '../App.css';

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
        <div className={classNames('tabla-columnas')}>
            <p>Datos a ingresar:</p>

            <div className="form-grupo">
                <button className="btn btn-mas" onClick={handleAgregarColumna}>+ Columna</button>
                <button className="btn btn-menos" onClick={handleQuitarColumna}>- Columna</button>
            </div>

            <div
                className="tabla-grid"
                style={{ gridTemplateColumns: `repeat(${numColumnas}, 1fr)` }}
            >
                {datos.map((fila, filaIndex) =>
                    fila.map((valor, colIndex) => (
                        <input
                            key={`${filaIndex}-${colIndex}`}
                            type="text"
                            value={valor}
                            onChange={(e) => handleInputChange(filaIndex, colIndex, e.target.value)}
                            className="celda"
                        />
                    ))
                )}
            </div>

            <div className="form-grupo">
                <button className="btn btn-mas" onClick={handleAgregarFila}>+ Fila</button>
                <button className="btn btn-menos" onClick={handleQuitarFila}>- Fila</button>
            </div>

            <div className="form-grupo">
                <button className="btn" onClick={handleCalcular}>Calcular</button>
            </div>
        </div>
    );
}
