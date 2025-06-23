import { Link } from 'react-router-dom';
import classNames from 'classnames';
import '../App.css';

export default function Encabezado() {
    return (
        <nav className="nav-encabezado">
            <Link className="nav-link" to="/inicio">Inicio</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/tendencia">Tendencia Central</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/dispersion">Dispersión</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/forma">Forma</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/localizacion">Localización</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/histograma">Histograma y Tabla de Frecuencia</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/parametros">Parámetros</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/limites">Límites Reales</Link>
            <span className="nav-separador">|</span>
            <Link className="nav-link" to="/caja">Diagrama de Caja</Link>
        </nav>
    );
}

