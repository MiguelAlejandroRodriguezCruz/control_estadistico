import React from 'react';
import classNames from 'classnames';
import '../App.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

export default function GraficaDistribucion({ datos }) {
    const frecuencias = {};

    datos.forEach(dato => {
        const valor = Math.round(parseFloat(dato));
        if (!isNaN(valor)) {
            frecuencias[valor] = (frecuencias[valor] || 0) + 1;
        }
    });

    const data = Object.entries(frecuencias).map(([valor, frecuencia]) => ({
        valor,
        frecuencia
    }));

    return (
        <div className="grafica-distribucion-container">
            <h4 className="grafica-titulo">Distribución de datos</h4>
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="valor" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="frecuencia" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

