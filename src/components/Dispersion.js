import React, { useState } from 'react';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';

export default function Dispersion() {
    const { tabla } = useTabla();
    const [tipo, setTipo] = useState('poblacion'); // 'poblacion' o 'muestra'
    const [resultados, setResultados] = useState({ varianza: null, desviacion: null });

    const calcularDispersion = () => {
        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num));

        if (datos.length === 0) {
            setResultados({ varianza: 'N/A', desviacion: 'N/A' });
            return;
        }

        const media = datos.reduce((acc, val) => acc + val, 0) / datos.length;
        const sumatoria = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);

        let varianza;
        if (tipo === 'poblacion') {
            varianza = sumatoria / datos.length;
        } else {
            varianza = sumatoria / (datos.length - 1);
        }

        const desviacion = Math.sqrt(varianza);

        setResultados({
            varianza: varianza.toFixed(4),
            desviacion: desviacion.toFixed(4)
        });
    };

    return (
        <div>
            <Encabezado />
            <h2>Dispersión</h2>
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
            <button onClick={calcularDispersion} style={{ marginTop: '15px' }}>
                Calcular
            </button>

            {/* Resultados */}
            <div style={{ marginTop: '20px' }}>
                <p><strong>Varianza : </strong> {resultados.varianza}</p>
                <p><strong>Desviación estándar : </strong> {resultados.desviacion}</p>
            </div>
        </div>
    );
}
