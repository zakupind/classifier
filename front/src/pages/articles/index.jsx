import { Container } from '@material-ui/core'
import React, { Component } from 'react'

import ArticleList from './article-list'
import SearchArticle from './search-article'

export default class Articles extends Component {
    render () {
        return (
            <Container>
                <SearchArticle />
                <ArticleList />
            </Container>
        )
    }
}