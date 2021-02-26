import React from 'react'

import ArticleList from './article-list'
import SearchArticle from './search-article'
import ModalForm from '../../components/modal-fortm'

export default function Articles () {
    return (
        <React.Fragment>
            <SearchArticle />
            <ArticleList />
            <ModalForm />
        </React.Fragment>
    )
}
