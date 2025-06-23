import classNames from 'classnames';
import Encabezado from '../components/Encabezado';
import Presentacion from '../components/Presentacion';
import '../App.css';

export default function Inicio() {
    return (
        <div className={classNames("inicio-container")}>
            <Encabezado />
            <Presentacion />
        </div>
    );
}
