import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from '../components/Encabezado';
import Tabla from '../components/Tabla';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';

export default function TendenciaCentral() {
    const { tabla } = useTabla();
    const [resultados, setResultados] = useState({ media: null, mediana: null, moda: null });

    const calcularTendencia = () => {
        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num));

        if (datos.length === 0) {
            setResultados({ media: 'N/A', mediana: 'N/A', moda: 'N/A' });
            return;
        }

        const suma = datos.reduce((acc, val) => acc + val, 0);
        const media = suma / datos.length;

        const ordenados = [...datos].sort((a, b) => a - b);
        const mitad = Math.floor(ordenados.length / 2);
        const mediana = ordenados.length % 2 === 0
            ? (ordenados[mitad - 1] + ordenados[mitad]) / 2
            : ordenados[mitad];

        const frecuencias = {};
        datos.forEach(num => {
            frecuencias[num] = (frecuencias[num] || 0) + 1;
        });

        const maxFrecuencia = Math.max(...Object.values(frecuencias));
        const moda = Object.entries(frecuencias)
            .filter(([_, freq]) => freq === maxFrecuencia)
            .map(([num]) => parseFloat(num));

        setResultados({
            media: media.toFixed(2),
            mediana: mediana.toFixed(2),
            moda: moda.length === datos.length ? 'Sin moda' : moda.join(', ')
        });
    };

    return (
        <div className="vista tendencia-central">
            <Encabezado />
            <h2 className="titulo-vista">Tendencia Central</h2>
            <Tabla />

            <button className="btn" onClick={calcularTendencia}>
                Calcular
            </button>

            <div className="resultados">
                <p><strong>Media:</strong> {resultados.media}</p>
                <p><strong>Mediana:</strong> {resultados.mediana}</p>
                <p><strong>Moda:</strong> {resultados.moda}</p>
            </div>
        </div>
    );
}
