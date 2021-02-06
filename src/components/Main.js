import React, {useState} from "react";
import classNames from "classnames";
import log from "loglevel";

import SearchBar from "./SearchBar";
import ModalWindow from "./ModalWindow";

import "./main.scss"

const picturesData = {
    author: "",
    image: "",
    icon: "",
    location: "",
    page: 1,
    orientation: "landscape",
    search: ""
}

const Main = () => {

    const [result, setResult] = useState([]);
    const [viewChange, setChangeView] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [orientationLandscape, setOrientationLandscape] = useState(true)

    const getImages = () => {
        fetch(`${process.env.REACT_APP_URL}${picturesData.page}&per_page=21&query=${picturesData.search}&orientation=${picturesData.orientation}&client_id=${process.env.REACT_APP_HIDDEN_KEY}`)
            .then(response => response.json())
            .then(data => setResult([...data.results]))
            .catch(message => log.error(message));
    }
    const showResults = (e) => {
        if (e.keyCode === 13 && picturesData.search.length) {
            getImages();
            setChangeView(true);
            picturesData.page = 1;
        }
    }
    const showResultsBtnClick = () => {
        getImages();
        setChangeView(true);
        picturesData.page = 1;
    }
    const pictureFromInput = (e) => {
        picturesData.search = e.target.value;
    }
    const pictureFromHint = (name) =>{
        picturesData.search = name;
    }
    const closeModalWindow = () => {
        setModalOpen(false);
    }

    const handleButtonMoreImages = () => {
        picturesData.page += 1;
        fetch(`${process.env.REACT_APP_URL}${picturesData.page}&per_page=21&query=${picturesData.search}&orientation=${picturesData.orientation}&client_id=${process.env.REACT_APP_HIDDEN_KEY}`)
            .then(response => response.json())
            .then(data => setResult(prevState => [...prevState, ...data.results]))
            .catch(message => log.error(message));
    }
    const handleModalOpen = (e) => {
        const index = e.target.id;
        const picture = result[index];
        picturesData.image = picture.urls.regular;
        picturesData.title = picture.alt_description;
        picturesData.author = picture.user.name;
        picturesData.icon = picture.user.profile_image.small;
        picturesData.location = picture.user.location
        setModalOpen(true);
    }
    const handleOrientationLandscape = () => {
        picturesData.orientation = "landscape";
        getImages();
        setOrientationLandscape(true)
    }
    const handleOrientationPortrait = () => {
        picturesData.orientation = "portrait";
        getImages();
        setOrientationLandscape(false);
    }

    const viewClassnamesButtonsOrientation = classNames({
        "orientationBtn-hide": !viewChange,
        "orientationBtn-show": viewChange
    });

    const viewClassnamesButtonMore = classNames({
        "moreBtn-hide":!viewChange,
        "moreBtn-show":viewChange
    })

    const viewClassnamesMain = classNames("main", {
        "main-change": viewChange,
    });

    const viewClassnamesSearchBox = classNames("search-box", {
        "search-box-change": viewChange,
    });


    return (
        <main className={viewClassnamesMain}>
            <div className={viewClassnamesSearchBox}>
                <h1 className="main-title">Best Images finder on the WEB</h1>
                <SearchBar showResultsBtnClick={showResultsBtnClick}
                           showResults={showResults}
                           pictureFromHint={pictureFromHint}
                           pictureFromInput={pictureFromInput}>
                </SearchBar>
            </div>
            {result !== [] &&
            <div className="buttons-orientation">
                <button className={viewClassnamesButtonsOrientation}
                        onClick={handleOrientationPortrait}>Portrait
                </button>
                <button className={viewClassnamesButtonsOrientation}
                        onClick={handleOrientationLandscape}>Landscape
                </button>
            </div>
            }
            <div className="photo-box">
                {result.map((elm, index) => {
                    return (
                        <div className="photo-frame"
                             key={index}>
                            <img id={index}
                                 className="photo"
                                 src={elm.urls.small}
                                 alt={picturesData.search}
                                 onClick={handleModalOpen}/>
                        </div>
                    )
                })
                }
            </div>
            <ModalWindow
                name={picturesData.author}
                icon={picturesData.icon}
                image={picturesData.image}
                location={picturesData.location}
                modalOpen={modalOpen}
                orientationLandscape={orientationLandscape}
                closeModalWindow={closeModalWindow}>
            </ModalWindow>
            {result !== [] &&
            <div className="button-more">
                <button className={viewClassnamesButtonMore}
                        onClick={handleButtonMoreImages}>More
                </button>
            </div>
            }
        </main>
    )
}

export default Main;