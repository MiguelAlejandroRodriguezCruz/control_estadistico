import React, { useState } from 'react';
import classNames from 'classnames';
import Encabezado from './Encabezado';
import Tabla from './Tabla';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

export default function Histo_Frec() {
    const { tabla } = useTabla();
    const [tipoDatos, setTipoDatos] = useState("desagrupados");
    const [resultado, setResultado] = useState([]);
    const [infoAgrupados, setInfoAgrupados] = useState(null);

    const calcularFrecuencias = () => {

        // Verificar si hay al menos una celda
        if (tabla.length === 0) {
            alert("Debe ingresar al menos un valor antes de calcular.");
            return;
        }

        const hayVacios = tabla.some(valor => valor.trim() === "");

        if (hayVacios) {
            alert("Por favor, complete todas las celdas antes de calcular.");
            return;
        }

        const datosNumericos = tabla.map(Number).filter(n => !isNaN(n));
        if (tipoDatos === "desagrupados") {
            const conteo = {};
            datosNumericos.forEach(valor => {
                conteo[valor] = (conteo[valor] || 0) + 1;
            });

            const total = datosNumericos.length;
            const ordenado = Object.entries(conteo)
                .map(([valor, frecuencia]) => ({ valor: Number(valor), frecuencia }))
                .sort((a, b) => a.valor - b.valor);

            let freqAcum = 0;
            const resultadoCalculado = ordenado.map((item) => {
                freqAcum += item.frecuencia;
                return {
                    valor: item.valor,
                    frecuencia: item.frecuencia,
                    frecRelativa: item.frecuencia / total,
                    frecAcumulada: freqAcum,
                    frecRelAcumulada: freqAcum / total
                };
            });

            setResultado(resultadoCalculado);
            setInfoAgrupados(null);
        } else {
            const n = datosNumericos.length;
            const min = Math.min(...datosNumericos);
            const max = Math.max(...datosNumericos);
            const rango = max - min;
            const k = Math.round(1 + 3.3 * Math.log10(n));
            const w = (rango / k);

            const clases = [];
            let limInf = min;
            let freqAcum = 0;

            for (let i = 0; i < k; i++) {
                const limSup = limInf + w;
                const clase = `${limInf.toFixed(2)} - ${limSup.toFixed(2)}`;
                const marca = (limInf + limSup) / 2;

                const frecuencia = datosNumericos.filter(d => {
                    if (i === k - 1) return d >= limInf && d <= limSup;
                    return d >= limInf && d < limSup;
                }).length;

                freqAcum += frecuencia;

                clases.push({
                    clase,
                    limInf,
                    limSup,
                    marca,
                    frecuencia,
                    frecAcumulada: freqAcum,
                    frecRelativa: frecuencia / n,
                    frecRelAcumulada: freqAcum / n
                });

                limInf = limSup;
            }

            setResultado(clases);
            setInfoAgrupados({ n, min, max, rango, k, w });
        }
    };

    return (
        <div className="histo-container">
            <Encabezado />
            <h2 className="histo-titulo">Histograma y Tabla de Frecuencias</h2>
            <Tabla />

            <div className="selector-tipo">
                <label htmlFor="tipoDatos">Tipo de datos:&nbsp;</label>
                <select
                    id="tipoDatos"
                    value={tipoDatos}
                    onChange={(e) => {
                        setTipoDatos(e.target.value);
                        setResultado([]);
                        setInfoAgrupados(null);
                    }}
                    className="select-tipo"
                >
                    <option value="desagrupados">Desagrupados</option>
                    <option value="agrupados">Agrupados</option>
                </select>
            </div>

            <button className="boton-calcular" onClick={calcularFrecuencias}>
                Calcular
            </button>

            {infoAgrupados && (
                <div className="info-agrupados">
                    <h3>Parámetros agrupados</h3>
                    <p><strong>Total de datos:</strong> {infoAgrupados.n}</p>
                    <p><strong>Mínimo:</strong> {infoAgrupados.min}</p>
                    <p><strong>Máximo:</strong> {infoAgrupados.max}</p>
                    <p><strong>Rango:</strong> {infoAgrupados.rango}</p>
                    <p><strong>Amplitud (k):</strong> {infoAgrupados.k}</p>
                    <p><strong>Tamaño de clase (w):</strong> {infoAgrupados.w}</p>
                </div>
            )}

            {resultado.length > 0 && (
                <div className="resultados-histograma">
                    <h3>Tabla de Frecuencias</h3>
                    <table className="tabla-frecuencias">
                        <thead>
                            <tr>
                                {tipoDatos === 'agrupados' ? (
                                    <>
                                        <th>Clase</th>
                                        <th>Límite Inferior</th>
                                        <th>Límite Superior</th>
                                        <th>Marca de Clase</th>
                                    </>
                                ) : (
                                    <th>Cantidad no conforme</th>
                                )}
                                <th>Frecuencia</th>
                                <th>Frecuencia Relativa</th>
                                <th>Frecuencia Acumulada</th>
                                <th>Frecuencia Relativa Acumulada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultado.map((row, i) => (
                                <tr key={i}>
                                    {tipoDatos === 'agrupados' ? (
                                        <>
                                            <td>{row.clase}</td>
                                            <td>{row.limInf.toFixed(2)}</td>
                                            <td>{row.limSup.toFixed(2)}</td>
                                            <td>{row.marca.toFixed(2)}</td>
                                        </>
                                    ) : (
                                        <td>{row.valor}</td>
                                    )}
                                    <td>{row.frecuencia}</td>
                                    <td>{row.frecRelativa.toFixed(2)}</td>
                                    <td>{row.frecAcumulada}</td>
                                    <td>{row.frecRelAcumulada.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="graficas">
                        <h4>Histograma de Frecuencia</h4>
                        <BarChart width={600} height={300} data={resultado}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={tipoDatos === "agrupados" ? "clase" : "valor"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="frecuencia" fill="#8884d8" />
                        </BarChart>

                        <h4>Histograma de Frecuencia Acumulada</h4>
                        <BarChart width={600} height={300} data={resultado}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={tipoDatos === "agrupados" ? "clase" : "valor"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="frecAcumulada" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>
            )}
        </div>
    );
}
