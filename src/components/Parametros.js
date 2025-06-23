import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';

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

        const k = Math.round(1 + 3.3*Math.log10(n)); // número de clases
        const w = (rango / k);    // tamaño de clase

        setInfoAgrupados({ n, min, max, rango, k, w });
        setMostrar(true);
    };

    return (
        <div className={classNames('vista', 'parametros')}>
            <Encabezado />
            <h2 className="titulo-vista">Parámetros</h2>
            <Tabla />

            <div className="form-grupo">
                <button className="btn" onClick={calcularParametros}>
                    Calcular
                </button>
            </div>

            {mostrar && infoAgrupados && (
                <div className="resultados">
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
