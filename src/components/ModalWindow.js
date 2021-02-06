import React from "react";
import Modal from "react-modal";
import classNames from "classnames"

import "./modalWindow.scss"

Modal.setAppElement("#root");

const ModalWindow = ({name, icon, image, modalOpen, closeModalWindow, location, orientationLandscape}) => {

    const modalClassnameWrap = classNames("modal",{
        "portrait": !orientationLandscape
    })

    return (
        <Modal isOpen={modalOpen}
               shouldCloseOnOverlayClick={true}
               onRequestClose={closeModalWindow}
               overlayClassName={"modal-overlay"}
               className={modalClassnameWrap}>
            <div className="modal__bar">
                <div className="author">
                    <img className="author__icon" src={icon} alt="icon"/>
                    <span className="author__data">{name}</span>
                </div>
                <button className="close-btn"
                    onClick={closeModalWindow}>X
                </button>
            </div>
            <div className="modal__photo">
                <img className="large-photo" src={image} alt="random"/>
            </div>
            <p className="photo-location" >
                <i className="fas fa-map-marker-alt"/>{location}
            </p>
        </Modal>
    )
}

export default ModalWindow;