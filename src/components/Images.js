import React from "react";

import "./images.scss"

const Images = ({result, handleModalOpen, pictureName}) =>{

    return(
        <div className="photo-box">
            {result.map(({urls:{small}}, index) => {
                return (
                    <div className="photo-frame"
                         key={index}>
                        <img id={index}
                             className="photo"
                             src={small}
                             alt={pictureName}
                             onClick={handleModalOpen}/>
                    </div>
                )
            })
            }
        </div>
    )
}

export default Images;