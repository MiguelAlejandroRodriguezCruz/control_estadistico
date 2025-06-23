import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';
import GraficaDistribucion from './GraficaDistribucion';
import '../App.css';

export default function Localizacion() {
    const { tabla } = useTabla();
    const [tipo, setTipo] = useState('poblacion');
    const [resultados, setResultados] = useState({ curtosis: null, tipoCurtosis: null });

    const calcularCurtosis = () => {
        const datos = tabla.map(num => parseFloat(num)).filter(num => !isNaN(num));
        const n = datos.length;

        if (n === 0) {
            setResultados({ curtosis: 'N/A', tipoCurtosis: 'N/A' });
            return;
        }

        const media = datos.reduce((acc, val) => acc + val, 0) / n;

        const sumatoria = datos.reduce((acc, val) => acc + Math.pow(val - media, 2), 0);
        const varianza = tipo === 'poblacion' ? sumatoria / n : sumatoria / (n - 1);
        const desviacion = Math.sqrt(varianza);

        if (desviacion === 0) {
            setResultados({ curtosis: 0, tipoCurtosis: 'Indefinido (sin variación)' });
            return;
        }

        const numerador = datos.reduce((acc, val) => acc + Math.pow((val - media) / desviacion, 4), 0);
        const curtosisBruta = tipo === 'poblacion' ? numerador / n : numerador / (n - 1);
        const curtosisExcesiva = curtosisBruta - 3;

        let tipoCurtosis = 'Mesocúrtica';
        if (curtosisExcesiva > 0) tipoCurtosis = 'Leptocúrtica';
        else if (curtosisExcesiva < 0) tipoCurtosis = 'Platicúrtica';

        setResultados({
            curtosis: curtosisExcesiva.toFixed(4),
            tipoCurtosis
        });
    };

    return (
        <div className={classNames('vista', 'localizacion')}>
            <Encabezado />
            <h2 className="titulo-vista">Localización (Curtosis)</h2>
            <Tabla />

            <div className="form-grupo">
                <label htmlFor="tipo">Tipo de datos:&nbsp;</label>
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="poblacion">Población</option>
                    <option value="muestra">Muestra</option>
                </select>
            </div>

            <button className="btn" onClick={calcularCurtosis}>
                Calcular
            </button>

            <div className="resultados">
                <p><strong>Curtosis:</strong> {resultados.curtosis}</p>
                <p><strong>Tipo:</strong> {resultados.tipoCurtosis}</p>
            </div>
        </div>
    );
}
