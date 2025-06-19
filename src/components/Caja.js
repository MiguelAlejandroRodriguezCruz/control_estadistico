import React, { useState } from 'react';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';

export default function Caja() {
    const { tabla } = useTabla();
    const [resultado, setResultado] = useState(null);

    const calcularCaja = () => {
        const datos = tabla.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
        const n = datos.length;

        const getCuartil = (p) => {
            const pos = p * (n + 1);
            const idx = Math.floor(pos) - 1;
            const resto = pos - Math.floor(pos);
            if (idx < 0) return datos[0];
            if (idx >= n - 1) return datos[n - 1];
            return datos[idx] + resto * (datos[idx + 1] - datos[idx]);
        };

        const q1 = getCuartil(0.25);
        const q2 = getCuartil(0.5);
        const q3 = getCuartil(0.75);
        const min = Math.min(...datos);
        const max = Math.max(...datos);

        setResultado({ min, q1, q2, q3, max });
    };

    const ancho = 600;
    const height = 120;
    const padding = 50;

    const escalarX = (valor) => {
        if (!resultado) return 0;
        const { min, max } = resultado;
        return padding + ((valor - min) / (max - min)) * (ancho - 2 * padding);
    };

    return (
        <div>
            <Encabezado />
            <h2>Diagrama de Caja y Bigotes</h2>
            <Tabla />

            <div style={{ margin: '20px 0' }}>
                <button onClick={calcularCaja}>Calcular</button>
            </div>

            {resultado && (
                <>
                    <div style={{ marginTop: '20px' }}>
                        <h3>Estadísticos</h3>
                        <ul>
                            <li>Mínimo: {resultado.min}</li>
                            <li>Q1: {resultado.q1}</li>
                            <li>Mediana (Q2): {resultado.q2}</li>
                            <li>Q3: {resultado.q3}</li>
                            <li>Máximo: {resultado.max}</li>
                        </ul>
                    </div>

                    <h3>Boxplot</h3>
                    <svg width={ancho} height={height}>
                        {/* Línea base */}
                        <line
                            x1={escalarX(resultado.min)}
                            x2={escalarX(resultado.max)}
                            y1={height / 2}
                            y2={height / 2}
                            stroke="black"
                        />

                        {/* Bigotes */}
                        <line
                            x1={escalarX(resultado.min)}
                            x2={escalarX(resultado.min)}
                            y1={height / 2 - 20}
                            y2={height / 2 + 20}
                            stroke="black"
                        />
                        <line
                            x1={escalarX(resultado.max)}
                            x2={escalarX(resultado.max)}
                            y1={height / 2 - 20}
                            y2={height / 2 + 20}
                            stroke="black"
                        />

                        {/* Caja */}
                        <rect
                            x={escalarX(resultado.q1)}
                            y={height / 2 - 25}
                            width={escalarX(resultado.q3) - escalarX(resultado.q1)}
                            height={50}
                            fill="#ccc"
                            stroke="black"
                        />

                        {/* Mediana */}
                        <line
                            x1={escalarX(resultado.q2)}
                            x2={escalarX(resultado.q2)}
                            y1={height / 2 - 25}
                            y2={height / 2 + 25}
                            stroke="red"
                            strokeWidth="2"
                        />

                        {/* Etiquetas numéricas */}
                        {['min', 'q1', 'q2', 'q3', 'max'].map((clave, i) => (
                            <text
                                key={clave}
                                x={escalarX(resultado[clave])}
                                y={height / 2 + 45}
                                textAnchor="middle"
                                fontSize="12"
                            >
                                {resultado[clave]}
                            </text>
                        ))}
                    </svg>
                </>
            )}
        </div>
    );
}
