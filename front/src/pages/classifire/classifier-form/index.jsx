import React, { useState } from 'react';
import { connect } from 'react-redux'

import {
    openModal,
    setStateModalForm,
    openModalError
} from '../../../store/action'

function ClassifierForm (props) {
    const [text, setText] = useState('')
    const [resultClassifier, setResulrClassifier] = useState('')

    function handlerAddButton (e) {
        e.preventDefault()

        props.setStateModalForm({
            content: text,
            tag: resultClassifier ? resultClassifier: 'истории'
        })
        props.openModal()
    }

    function handlerClassifierButton (e) {
        e.preventDefault()
        setResulrClassifier('')

        if (text.trim() === '') {
            props.openModalError({textError: 'Введите текст'})

        } else {
            fetch ('http://127.0.0.1:8000/api/classifier', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                method: 'POST',
                body: JSON.stringify({text: text})
            })
            .then((response) => (response.ok ? response : Promise.reject(response)))
            .then((response) => response.json())
            .then((response) => setResulrClassifier(response.tag))
        }
    }

    return (
        <React.Fragment>
            <div className="classifire-form-wrapper">
                <form>
                    <textarea
                        name="title"
                        id="title"
                        rows="7"
                        className="form-article__input"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                    <div>
                        <button className="add__button" onClick={handlerAddButton}>Добавить</button>
                        <button type="submit" className="search__button" onClick={handlerClassifierButton}>Классифицировать</button>
                    </div>
                </form>
                {resultClassifier && 
                    <span className="classifire-form__result">
                        Текст принадлежит к классу:
                        <b> {resultClassifier}</b>
                    </span>
                }
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    openModal,
    setStateModalForm,
    openModalError
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifierForm)