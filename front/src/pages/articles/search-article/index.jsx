import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    searchSubmit,
    setParamsSearch,
    openModal,
    searchNull,
  } from '../../../store/action'

class SearchArticle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            optionsAuthor: [],
            search: '',
            tag: '',
            author: '',
            page: '1'
        }
    }

    submit = (event) => {
        const {search, tag, author, page} = this.state
        event.preventDefault()
        this.props.setParamsSearch({search, tag, author, page})
        this.props.searchSubmit({search, tag, author, page})
    }

    componentDidMount() {
        const {search, tag, author, page} = this.state

        fetch('http://localhost:8000/api/articles/get-author')
            .then((response) => (response.ok ? response : Promise.reject(response)))
            .then((response) => response.json())
            .then((response) => {
                let arrayAuthors = [] 
                for ( const item of response) {
                    arrayAuthors.push(item.sourceName)
                }
                this.setState({optionsAuthor: arrayAuthors})})
            .catch(this.setState({optionsAuthor: []}))

        this.props.searchSubmit({search, tag, author, page})
    }

    handleAddArticle = (event) => {
        event.preventDefault();
        this.props.openModal()
    }

    render() {
        return (
            <div className="search-form-wrapper">
            <form
                className="search-form"
            >
                <input
                    placeholder="Поиск"
                    name="search"
                    className="search-form__query"
                    value={this.state.search}
                    onChange={(e) => {this.setState({search: e.target.value})}}
                />
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '60%'}}>
                        <div>
                            <label htmlFor="tag">Выберете категорию</label>
                            <br />
                            <select
                                name="tag"
                                value={this.state.tag}
                                onChange={(e) => {this.setState({tag: e.target.value})}}
                            >
                                <option value="">Не выбрана</option>
                                <option value="истории">Истории</option>
                                <option value="новости">Новости</option>
                                <option value="разбор">Разбор</option>
                                <option value="шапито">Шапито</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="author">Выберете автора</label>
                            <br />
                            <select
                                name="author"
                                value={this.state.author}
                                onChange={(e) => {this.setState({author: e.target.value})}}
                            >
                                <option value="" selected>Не выбран</option>
                                {this.state.optionsAuthor?.map((item) => (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <button className="add__button" onClick={this.handleAddArticle}>Добавить</button>
                        <button type="submit" className="search__button" onClick={this.submit}>Найти</button>
                    </div>
                </div>
            </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    searchSubmit,
    setParamsSearch,
    openModal
}

export default connect(null, mapDispatchToProps)(SearchArticle)