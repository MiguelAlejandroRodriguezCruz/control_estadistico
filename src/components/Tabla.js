import { useState } from 'react';
import { useTabla } from '../contexts/TablaContext';

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
        // Solo permitir números y decimales
        if (/^-?\d*\.?\d*$/.test(valor)) {
            actualizarCelda(index, valor);
        }
    };

    return (
        <div>
            <p>Datos a ingresar:</p>
            <input
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />
            <button onClick={handleCrear}>Aceptar</button>

            <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
                    {tabla.map((valor, index) => (
                        <input
                            key={index}
                            type="text"
                            value={valor}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            style={{ padding: '10px', textAlign: 'center' }}
                        />
                    ))}
                </div>

                <div style={{ marginTop: '10px' }}>
                    <button onClick={agregarCelda}>+</button>
                    <button onClick={quitarCelda} style={{ marginLeft: '5px' }}>-</button>
                </div>
            </div>
        </div>
    );
}
