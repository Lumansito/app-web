import {getRutinas_pre_establecidasBySexoNroDias} from "../api/rutinas_pre_establecidas.api.js";
import React, { useEffect, useState } from "react";
import { LineaRutina } from "../components/LineaRutina";

export function Rutina() {
    function renderMain() {
        
        const [lineas, setLineas] = useState([]);

        useEffect(() => {
            const fetchLineasRutina = async () => {
                const response = await getRutinas_pre_establecidasBySexoNroDias("Masculino","3d")
                setLineas(response.data);
                console.log(response);
            }
            fetchLineasRutina();
        }, []);

        return (
            <div id="rutina">
                <h1>Rutina Pre establecida</h1>
                <ul>
                {lineas.map((linea) => (<li key={linea.orden}><LineaRutina linea={linea} /></li>
))}
                </ul>
            </div>
        );
    
      }
    return (
        <div>
            {renderMain()}
        </div>
    )

}