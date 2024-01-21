import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import axios from 'axios';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const { loading, error, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props;
        console.log(charId);
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        console.log(char);

        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, img, id } = char;
    const [editName, setEditName] = useState(name);
    const [editDesc, setEditDesc] = useState(description);
    const [editImage, setEditImage] = useState(img);

    const onEdit = () => {
        axios.put(`http://localhost:5175/chars/${id}`, {
            "name": editName,
            "description": editDesc,
            "img": editImage
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onDelet = () => {
        axios.delete(`http://localhost:5175/chars/${id}`,
        ).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    }



    let imgStyle = { 'objectFit': 'cover' };
    if (img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={img} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">
                        <input
                            onChange={e => setEditName(e.target.value)}
                            type="text"
                            name="char-info"
                            value={editName} />
                        <input
                            onChange={e => setEditDesc(e.target.value)}
                            type="text"
                            name="char-info"
                            value={editDesc} />
                        <input
                            onChange={e => setEditImage(e.target.value)}
                            type="url"
                            name="char-url"
                            value={editImage} />
                    </div>

                    <div className="char__btns">
                        <button onClick={() => onEdit()} className="button button__main">
                            <div className="inner">Edit</div>
                        </button>
                        <button onClick={() => onDelet()} className="button button__secondary">
                            <div className="inner">Deleted</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;