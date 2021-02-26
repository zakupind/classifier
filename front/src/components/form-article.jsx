import React from 'react'
import { connect } from 'react-redux'

import {
    setStateModalForm,
    closeModal,
    submitAddForm,
    sumbitEditForm,
    searchSubmit
} from '../store/action'

import cancel from '../img/cancel.svg'

function FormArticle (props) {

    function closeModalAndClearState () {
        props.setStateModalForm({
            id: '',
            title: '',
            tag: 'истории',
            secondTitle: '',
            author: '',
            authorUrl: '',
            content: '',
            date: ''
        })
    
        props.closeModal();
    }

    const submit = (e) => {
        const {
            search,
            tag,
            author,
            page
        } = props.stateSearch

        e.preventDefault()
        if (props.id === '') {
            // POST
            props.submitAddForm(props)
        } else {
            // PUT
            props.sumbitEditForm(props)
        }
        closeModalAndClearState()
    }

    function setState (e) {
        const {name, value} = e.target
        props.setStateModalForm({[name]: value})
    }

    return(
        <div className="form-article__wrapper">
            <div className="article-form__button_wrapper">
                <button className="form-article__button_cancel" onClick={() => closeModalAndClearState()}>
                    <img src={cancel} alt="cancel" width="30px" />
                </button>
            </div>
            <form
                onChange={(e) => setState(e)}
                onSubmit={(e) => submit(e)}
            >
                <label htmlFor="title">Заголовок</label>
                <br/>
                <textarea
                    name="title"
                    id="title"
                    rows="3"
                    className="form-article__input"
                    value={props.title}
                    required
                />

                <label htmlFor="secondTitle">Подзаголовок</label>
                <br/>
                <textarea
                    className="form-article__input"
                    name="secondTitle"
                    id="secondTitle"
                    rows="3"
                    value={props.secondTitle}
                />

                <label htmlFor="tag">Категория</label>
                <select
                    name="tag"
                    id="tag"
                    className="form-article__input"
                    value={props.tag}
                    required
                >
                    <option value="истории">Истории</option>
                    <option value="новости">Новости</option>
                    <option value="разбор">Разбор</option>
                    <option value="шапито">Шапито</option>
                </select>
                

                <label htmlFor="author">Автор</label>
                <br/>
                <input
                    className="form-article__input"
                    name="author"
                    id="author"
                    value={props.author}
                    required
                />

                <label htmlFor="authorUrl">Ссылка на автора</label>
                <br/>
                <input
                    className="form-article__input"
                    name="authorUrl"
                    id="authorUrl"
                    value={props.authorUrl}
                />

                <label htmlFor="content">Текст статьи</label>
                <br/>
                <textarea
                    className="form-article__input"
                    name="content"
                    id="content"
                    rows="6"
                    value={props.content}
                    required
                />

                <div className="article-form__button_wrapper">
                    <input type="submit" className="add__button" />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    id: state.editArticle.id,
    title: state.editArticle.title,
    secondTitle: state.editArticle.secondTitle,
    author: state.editArticle.author,
    authorUrl: state.editArticle.authorUrl,
    content: state.editArticle.content,
    date: state.editArticle.date,
    tag: state.editArticle.tag,
    stateSearch: state.search
})

const mapDispatchToProps = {
    setStateModalForm,
    closeModal,
    submitAddForm,
    sumbitEditForm,
    searchSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(FormArticle);