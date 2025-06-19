import React, { createContext, useContext, useState } from 'react';

const TablaContext = createContext();

export const useTabla = () => useContext(TablaContext);

export const TablaProvider = ({ children }) => {
    const [tabla, setTabla] = useState([]);

    const actualizarCelda = (index, valor) => {
        const nuevaTabla = [...tabla];
        nuevaTabla[index] = valor;
        setTabla(nuevaTabla);
    };

    const inicializarTabla = (cantidad) => {
        setTabla(Array.from({ length: cantidad }, (_, i) => ''));
    };

    const agregarCelda = () => setTabla([...tabla, '']);
    const quitarCelda = () => setTabla(tabla.slice(0, -1));

    return (
        <TablaContext.Provider value={{
            tabla,
            inicializarTabla,
            actualizarCelda,
            agregarCelda,
            quitarCelda
        }}>
            {children}
        </TablaContext.Provider>
    );
};
