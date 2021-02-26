import React, {useState} from "react";
import log from "loglevel";

import "./searchBar.scss";

const SearchBar = ({showResultsBtnClick, showResults, pictureFromInput, pictureFromHint}) => {

    const [inputText, setInputText] = useState("");
    const [hints, setHints] = useState([]);
    const [showList, setShowList] = useState(false);

    const handleInput = e => {
        const value = e.target.value.toLowerCase();
        setInputText(value);
        pictureFromInput(e);
        if (value.length >= 1) {
            setTimeout(() => {
                fetch(`https://api.datamuse.com/sug?s=${value}&max=6`)
                    .then(response => response.json())
                    .then(data => {
                        const description = [...data].map(({word}) => word)
                        setHints([...description]);
                        setShowList(true);
                    })
                    .catch(message => log.error(message))
            }, 400)
        } else {
            setShowList(false);
        }
    }
    const handleHint = e => {
        const clickedHint = e.target.id;
        setInputText(hints[clickedHint]);
        pictureFromHint(hints[clickedHint]);
        setShowList(false);
        showResultsBtnClick();
    }
    const handleResults = e => {
        showResults(e);
        if (e.keyCode === 13) {
            setShowList(false)
        }
    }

    const handleSearchBtn = () =>{
        showResultsBtnClick();
        setShowList(false);
    }

    const handleCloseBtn = () => {
        setInputText("");
        pictureFromHint("");
        setShowList(false);
    }

    return (
        <>
            <div className="input-wrap">
                <button className="btn-search"
                        onClick={handleSearchBtn}>
                    <i className="fas fa-search"/>
                </button>
                <input className={"input-search"}
                       type="text"
                       id={"searchId"}
                       placeholder={"search photos..."}
                       value={inputText}
                       onKeyDown={handleResults}
                       onChange={handleInput}/>
                <button className="btn-clear" onClick={handleCloseBtn}>
                    <i className="fas fa-times"/>
                </button>
            </div>
            {showList &&
            <ul className="search-hints">
                {hints &&
                    hints.map((elm, index) => {
                        return <li id={index} className="hint" key={index} onClick={handleHint}>{elm}</li>
                    })
                }
            </ul>
            }
            <label className="search-label" htmlFor={"searchId"}> Powered by Unsplash</label>
        </>
    )
}
export default SearchBar;