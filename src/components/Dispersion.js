import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';

export default function Dispersion() {
    const { tabla } = useTabla();
    const [tipo, setTipo] = useState('poblacion');
    const [resultados, setResultados] = useState({ varianza: null, desviacion: null });

    const calcularDispersion = () => {
        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num));

        if (datos.length === 0) {
            setResultados({ varianza: 'N/A', desviacion: 'N/A' });
            return;
        }

        const media = datos.reduce((acc, val) => acc + val, 0) / datos.length;
        const sumatoria = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);

        let varianza = tipo === 'poblacion'
            ? sumatoria / datos.length
            : sumatoria / (datos.length - 1);

        const desviacion = Math.sqrt(varianza);

        setResultados({
            varianza: varianza.toFixed(4),
            desviacion: desviacion.toFixed(4)
        });
    };

    return (
        <div className="dispersion-container">
            <Encabezado />
            <h2 className="dispersion-titulo">Dispersión</h2>
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

            <button className="boton-calcular" onClick={calcularDispersion}>
                Calcular
            </button>

            <div className="resultado-dispersion">
                <p><strong>Varianza: </strong> {resultados.varianza}</p>
                <p><strong>Desviación estándar: </strong> {resultados.desviacion}</p>
            </div>
        </div>
    );
}
