
import React from 'react';
import ButtonPrimary from '../components/buttons/ButtonPrimary';
import { useNavigate } from 'react-router-dom';

interface Props {
    // Define props here
}

const Banner: React.FC<Props> = (Props) => {

    const navigate = useNavigate();

    return (
        <div className="">
            <div className="cont-banner">
                <div className="banner">                
                    <div className="cont-banner1">
                        <h2 className="font-style-subtitle">Encuentra mascotas perdidas con AyudaPet</h2>
                        <p className="font-style-normalText-italic">
                            Publica, comenta y comparte avistamientos para reuinir mascotas con sus dueños.
                            Juntos podemos ayudar a reunir familias peludas!
                        </p>
                        <ButtonPrimary
                            onClick={() => navigate("publications")}
                        >
                            {"VER LAS MASCOTAS"}
                        </ButtonPrimary>
                    </div>
                    <div className="cont-banner2">                                                       
                        <img src="https://firebasestorage.googleapis.com/v0/b/grupo12-f7def.appspot.com/o/imagenesGrupo12%2Fimg001.jpg?alt=media&token=fdfa4317-3447-405f-b097-e38ceb3f6dbe" alt="aves" className="img" />                                                                 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;