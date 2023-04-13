import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';

import { useEffect, useState } from 'react';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(8);
    const [comicsEnded, setComicsEnded] = useState();

    const {loading, error, getAllComics} = useMarvelService();

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                <li className="comics__item">
                    <a href="#">
                        <img src="DC" alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;