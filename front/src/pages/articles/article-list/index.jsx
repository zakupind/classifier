import React from 'react';
import { connect } from 'react-redux'

import ReactPaginate  from 'react-paginate';
import ArticleItem from './article-item'
import Loader from '../../../components/Loader'

import {
  searchSubmit,
} from '../../../store/action'

class ArticleList extends React.Component {
    constructor (props) {
      super(props)

      this.clickNumberPage = this.clickNumberPage.bind(this)
    }

    clickNumberPage (numberPage) {
      const { selected } = numberPage
      const { search, tag, author} = this.props
      
      this.props.searchSubmit({search, tag, author, page: selected + 1})
    }
    render () {
        const { isFetching, statusSearch, articles, count } = this.props
        const pageCount = Math.floor(count / 10)

        return (
            <div>
            {isFetching
              ? <Loader />
              : (
                <div className="article-list__wrapper">
                  <span className="search__status">{statusSearch}</span>
                  <ul>
                    {articles.map((article) => (
                      <li className="article-item__wrapper">
                          <ArticleItem {...article} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

                {count > 10 &&
                  <ReactPaginate  
                    pageCount={pageCount}
                    onPageChange={this.clickNumberPage}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={5}
                    containerClassName="pagination-container pagination"
                    pageClassName="pagination-pages"
                    pageLinkClassName="pagination-link"
                    nextLinkClassName="pagination-link"
                    previousLinkClassName="pagination-link"
                    previousClassName="pagination-pages"
                    nextClassName="pagination-pages"
                    nextLabel="Дальше"
                    previousLabel="Назад"
                  />
                }

          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    articles: state.search.articles,
    statusSearch: state.search.statusSearch,
    isFetching: state.search.isFetching,
    count: state.search.count,
    search: state.search.search,
    tag: state.search.tag,
    author: state.search.author,
    page: state.search.page
})

const mapDispatchToProps = {
  searchSubmit
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)