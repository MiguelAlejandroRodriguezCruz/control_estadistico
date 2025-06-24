import { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import TablaColumnas from './TablaColumnas';
import '../App.css';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Limites() {
    const constantsTable = {
        2: { A2: 1.880, D3: 0, D4: 3.267 },
        3: { A2: 1.023, D3: 0, D4: 2.574 },
        4: { A2: 0.729, D3: 0, D4: 2.282 },
        5: { A2: 0.577, D3: 0, D4: 2.114 },
        6: { A2: 0.483, D3: 0, D4: 2.004 },
        7: { A2: 0.419, D3: 0.076, D4: 1.924 },
        8: { A2: 0.373, D3: 0.136, D4: 1.864 },
        9: { A2: 0.337, D3: 0.184, D4: 1.816 },
        10: { A2: 0.308, D3: 0.223, D4: 1.777 },
        11: { A2: 0.285, D3: 0.239, D4: 1.744 },
        12: { A2: 0.266, D3: 0.252, D4: 1.693 },
        13: { A2: 0.249, D3: 0.265, D4: 1.653 },
        14: { A2: 0.235, D3: 0.277, D4: 1.618 },
        15: { A2: 0.223, D3: 0.287, D4: 1.587 },
        16: { A2: 0.212, D3: 0.296, D4: 1.560 },
        17: { A2: 0.203, D3: 0.304, D4: 1.536 },
        18: { A2: 0.194, D3: 0.311, D4: 1.515 },
        19: { A2: 0.187, D3: 0.317, D4: 1.496 },
        20: { A2: 0.180, D3: 0.323, D4: 1.479 },

    };

    const [filas, setFilas] = useState([]);
    const [resultados, setResultados] = useState(null);

    const calcularLimites = (datos) => {
        setFilas(datos);
        const n = datos[0].length;
        const constantes = constantsTable[n];
        if (!constantes) return alert('Número de columnas no válido');

        const medias = datos.map(fila => fila.reduce((acc, val) => acc + parseFloat(val), 0) / n);
        const rangos = datos.map(fila => Math.max(...fila) - Math.min(...fila));

        const promedioMedias = medias.reduce((a, b) => a + b, 0) / medias.length;
        const promedioRangos = rangos.reduce((a, b) => a + b, 0) / rangos.length;

        const { A2, D3, D4 } = constantes;

        const graficaX = medias.map((media, i) => ({
            muestra: `M${i + 1}`,
            media,
            LC: promedioMedias,
            LCS: promedioMedias + A2 * promedioRangos,
            LCI: promedioMedias - A2 * promedioRangos
        }));

        const graficaR = rangos.map((rango, i) => ({
            muestra: `M${i + 1}`,
            rango,
            LC: promedioRangos,
            LCS: D4 * promedioRangos,
            LCI: D3 * promedioRangos
        }));

        setResultados({ promedioMedias, promedioRangos, A2, D3, D4, graficaX, graficaR });
    };

    return (
        <div className={classNames('vista', 'limites')}>
            <Encabezado />
            <h2 className="titulo-vista">Límites Reales</h2>
            <TablaColumnas onCalcular={calcularLimites} />

            {resultados && (
                <div className="contenedor-resultados">
                    <h3>Tabla de resultados</h3>
                    <table className="tabla-limites">
                        <thead>
                            <tr>
                                <th colSpan="4">Gráfica X̄</th>
                                <th colSpan="4">Gráfica R</th>
                            </tr>
                            <tr>
                                <th>Media (X̄)</th>
                                <th>LC</th>
                                <th>LCS</th>
                                <th>LCI</th>
                                <th>Rango (R)</th>
                                <th>LC</th>
                                <th>LCS</th>
                                <th>LCI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultados.graficaX.map((x, i) => {
                                const r = resultados.graficaR[i];
                                return (
                                    <tr key={i}>
                                        <td>{x.media.toFixed(2)}</td>
                                        <td>{x.LC.toFixed(2)}</td>
                                        <td>{x.LCS.toFixed(2)}</td>
                                        <td>{x.LCI.toFixed(2)}</td>
                                        <td>{r.rango.toFixed(2)}</td>
                                        <td>{r.LC.toFixed(2)}</td>
                                        <td>{r.LCS.toFixed(2)}</td>
                                        <td>{r.LCI.toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className="graficas">
                        <div>
                            <h3>Gráfica X̄</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={resultados.graficaX}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="muestra" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="media" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="LC" stroke="#82ca9d" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="LCS" stroke="#ff7300" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="LCI" stroke="#ff7300" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grafica-r">
                            <h3>Gráfica R</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={resultados.graficaR}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="muestra" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="rango" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="LC" stroke="#82ca9d" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="LCS" stroke="#ff7300" strokeDasharray="5 5" />
                                    <Line type="monotone" dataKey="LCI" stroke="#ff7300" strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
