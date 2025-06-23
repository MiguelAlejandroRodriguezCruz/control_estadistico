import { useState } from 'react';
import classNames from 'classnames';
import { useTabla } from '../contexts/TablaContext';
import '../App.css';

export default function Tabla() {
    const [cantidad, setCantidad] = useState('');
    const {
        tabla,
        inicializarTabla,
        actualizarCelda,
        agregarCelda,
        quitarCelda
    } = useTabla();

    const handleCrear = () => {
        const cant = parseInt(cantidad);
        if (!isNaN(cant) && cant >= 0) inicializarTabla(cant);
    };

    const handleInputChange = (index, valor) => {
        if (/^-?\d*\.?\d*$/.test(valor)) {
            actualizarCelda(index, valor);
        }
    };

    return (
        <div className={classNames('tabla-contenedor')}>
            <p>Datos a ingresar:</p>

            <div className="form-grupo">
                <input
                    type="number"
                    className="input-numero"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
                <button className="btn" onClick={handleCrear}>Aceptar</button>
            </div>

            <div className="tabla-inputs">
                {tabla.map((valor, index) => (
                    <input
                        key={index}
                        type="text"
                        value={valor}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        className="celda"
                    />
                ))}
            </div>

            <div className="form-grupo">
                <button className="btn btn-mas" onClick={agregarCelda}>+</button>
                <button className="btn btn-menos" onClick={quitarCelda}>-</button>
            </div>
        </div>
    );
}
