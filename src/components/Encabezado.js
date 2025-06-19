import { Link } from 'react-router-dom';

export default function Encabezado() {
    return (
        <nav style={{ background: '#eee', padding: '10px' }}>
            <Link to="/inicio">Inicio</Link> |{" "}
            <Link to="/tendencia">Tendencia Central</Link> |{" "}
            <Link to="/dispersion">Dispersión</Link> |{" "}
            <Link to="/forma">Forma</Link> |{" "}
            <Link to="/localizacion">Localización</Link> |{" "}
            <Link to="/histograma">Histograma y Tabla de Frecuencia</Link> |{" "}
            <Link to="/parametros">Parámetros</Link> |{" "}
            <Link to="/limites">Límites Reales</Link> |{" "}
            <Link to="/caja">Diagrama de Caja</Link>
        </nav>
    );
}
