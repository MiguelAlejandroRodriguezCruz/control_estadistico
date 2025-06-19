import React, { useState } from 'react';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';

export default function Parametros() {
    const { tabla } = useTabla();
    const [infoAgrupados, setInfoAgrupados] = useState(null);
    const [mostrar, setMostrar] = useState(false);

    const calcularParametros = () => {
        const datos = tabla.map(Number).filter(x => !isNaN(x)).sort((a, b) => a - b);
        const n = datos.length;
        const min = Math.min(...datos);
        const max = Math.max(...datos);
        const rango = max - min;

        const k = Math.ceil(Math.sqrt(n)); // número de clases
        const w = Math.ceil(rango / k);    // tamaño de clase

        setInfoAgrupados({ n, min, max, rango, k, w });
        setMostrar(true);
    };

    return (
        <div>
            <Encabezado />
            <h2>Parámetros</h2>
            <Tabla />

            {/* Botón para mostrar los cálculos */}
            <div style={{ marginTop: '20px' }}>
                <button onClick={calcularParametros}>Calcular</button>
            </div>

            {/* Mostrar resultados solo si se presionó el botón */}
            {mostrar && infoAgrupados && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Parámetros agrupados</h3>
                    <p><strong>Total de datos:</strong> {infoAgrupados.n}</p>
                    <p><strong>Mínimo:</strong> {infoAgrupados.min}</p>
                    <p><strong>Máximo:</strong> {infoAgrupados.max}</p>
                    <p><strong>Rango:</strong> {infoAgrupados.rango}</p>
                    <p><strong>Número de clases (k):</strong> {infoAgrupados.k}</p>
                    <p><strong>Tamaño de clase (w):</strong> {infoAgrupados.w}</p>
                </div>
            )}
        </div>
    );
}
