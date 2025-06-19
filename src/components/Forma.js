import React, { useState } from 'react';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';

export default function Forma() {
    const { tabla } = useTabla();
    const [tipo, setTipo] = useState('poblacion'); // Default
    const [resultados, setResultados] = useState({ sesgo: null, sesgoEstandarizado: null });

    const calcularSesgo = () => {
        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num)).sort((a, b) => a - b);
        const n = datos.length;

        if (n === 0) {
            setResultados({ sesgo: 'N/A', sesgoEstandarizado: 'N/A' });
            return;
        }

        // Calcular media
        const media = datos.reduce((acc, val) => acc + val, 0) / n;

        // Calcular mediana
        let mediana;
        if (n % 2 === 0) {
            mediana = (datos[n / 2 - 1] + datos[n / 2]) / 2;
        } else {
            mediana = datos[Math.floor(n / 2)];
        }

        // Calcular desviación estándar según tipo
        const sumaCuadrados = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
        const varianza = tipo === 'poblacion' ? sumaCuadrados / n : sumaCuadrados / (n - 1);
        const desviacion = Math.sqrt(varianza);

        if (desviacion === 0) {
            setResultados({ sesgo: 0, sesgoEstandarizado: 0 });
            return;
        }

        // Sesgo
        const sesgo = 3 * (media - mediana) / desviacion;

        // Sesgo estandarizado
        const sesgoEstandarizado = sesgo / Math.sqrt(6 / n);

        setResultados({
            sesgo: sesgo.toFixed(4),
            sesgoEstandarizado: sesgoEstandarizado.toFixed(4)
        });
    };

    return (
        <div>
            <Encabezado />
            <h2>Forma</h2>
            <Tabla />

            {/* Selector de tipo */}
            <div style={{ marginTop: '15px' }}>
                <label htmlFor="tipo">Tipo de datos:</label>{' '}
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="poblacion">Población</option>
                    <option value="muestra">Muestra</option>
                </select>
            </div>

            {/* Botón de calcular */}
            <button onClick={calcularSesgo} style={{ marginTop: '15px' }}>
                Calcular
            </button>

            {/* Resultados */}
            <div style={{ marginTop: '20px' }}>
                <p><strong>Sesgo:</strong> {resultados.sesgo}</p>
                <p><strong>Sesgo estandarizado:</strong> {resultados.sesgoEstandarizado}</p>
            </div>
        </div>
    );
}
