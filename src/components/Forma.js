import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';

export default function Forma() {
    const { tabla } = useTabla();
    const [tipo, setTipo] = useState('poblacion');
    const [resultados, setResultados] = useState({ sesgo: null, sesgoEstandarizado: null });

    const calcularSesgo = () => {

        // Verificar si hay al menos una celda
        if (tabla.length === 0) {
            alert("Debe ingresar al menos un valor antes de calcular.");
            return;
        }

        const hayVacios = tabla.some(valor => valor.trim() === "");

        if (hayVacios) {
            alert("Por favor, complete todas las celdas antes de calcular.");
            return;
        }

        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num)).sort((a, b) => a - b);
        const n = datos.length;

        if (n === 0) {
            setResultados({ sesgo: 'N/A', sesgoEstandarizado: 'N/A' });
            return;
        }

        const media = datos.reduce((acc, val) => acc + val, 0) / n;

        let mediana;
        if (n % 2 === 0) {
            mediana = (datos[n / 2 - 1] + datos[n / 2]) / 2;
        } else {
            mediana = datos[Math.floor(n / 2)];
        }

        const sumaCuadrados = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
        const varianza = tipo === 'poblacion' ? sumaCuadrados / n : sumaCuadrados / (n - 1);
        const desviacion = Math.sqrt(varianza);

        if (desviacion === 0) {
            setResultados({ sesgo: 0, sesgoEstandarizado: 0 });
            return;
        }

        const sesgo = 3 * (media - mediana) / desviacion;
        const sesgoEstandarizado = sesgo / Math.sqrt(6 / n);

        setResultados({
            sesgo: sesgo.toFixed(4),
            sesgoEstandarizado: sesgoEstandarizado.toFixed(4)
        });
    };

    return (
        <div className="forma-container">
            <Encabezado />
            <h2 className="forma-titulo">Forma</h2>
            <Tabla />

            <div className="selector-tipo">
                <label htmlFor="tipo">Tipo de datos:</label>
                <select
                    id="tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                    className="select-tipo"
                >
                    <option value="poblacion">Población</option>
                    <option value="muestra">Muestra</option>
                </select>
            </div>

            <button className="boton-calcular" onClick={calcularSesgo}>
                Calcular
            </button>

            <div className="resultado-forma">
                <p><strong>Sesgo:</strong> {resultados.sesgo}</p>
                <p><strong>Sesgo estandarizado:</strong> {resultados.sesgoEstandarizado}</p>
            </div>
        </div>
    );
}
