import React from 'react';
import { connect } from 'react-redux';

import close from '../../../img/close.svg'
import edit from '../../../img/edit.svg'

import {
  setStateModalForm,
  openModal,
  deleteArticle,
  searchSubmit
} from '../../../store/action'

export class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textHidden: true,
    };

    this.expandText = this.expandText.bind(this);
    this.hendleEditButton = this.hendleEditButton.bind(this);
    this.handleDeleteButton = this.handleDeleteButton.bind(this);
  }

  expandText() {
    const { textHidden } = this.state;
    this.setState({ textHidden: !textHidden });
  }

  hendleEditButton() {
    const {sourceName: author, sourceUrl: authorUrl} = this.props.source
    const {
      id,
      title,
      secondTitle,
      date,
      content
    } = this.props

    const tag = this.props.tag.name

    this.props.setStateModalForm({id, title, secondTitle, tag, date, author, authorUrl, content})
    this.props.openModal()
  }

  handleDeleteButton() {
    const {
      id,
      search,
      tagName,
      author,
      page
    } = this.props
  
    this.props.deleteArticle(id)
    this.props.searchSubmit({search, tagName, author, page})
  }

  render() {
    const {
      id,
      title,
      secondTitle,
      date,
      tag,
      source,
      content
    } = this.props;

    const { textHidden } = this.state;

    return (
      <div className="vacancy-wrapper">
        <div className="vacancy__title_wrapper">
          <div>
            <h3 className="vacancy__title">{title}</h3>
            {secondTitle && <h4 className="second-title">{secondTitle}</h4>}
            </div>
            <div className="buttons-wrapper">
              <button
                className="favourites-item__button_del"
                type="button"
                onClick={this.hendleEditButton}
              >
                <img className="favourites-item__button_img_del" alt="Редактировать" src={edit} />
              </button>
              <button className="favourites-item__button_del" type="button" onClick={this.handleDeleteButton}>
                <img className="favourites-item__button_img_del" alt="Удалить" src={close} />
              </button>
            </div>
        </div>
        <div className="vacancy__header">
          <div className="vacancy__company_wrapper">
            <span>
              <a
                className="vacancy__company_name"
                href={source.sourceUrl}
              >
                {source.sourceName}
              </a>
            </span>
            <span className="tag">{tag.name}</span>
          </div>
          <span>{date}</span>
        </div>
        <div>
          <div
            className={textHidden ? 'vacancy__description description-text__hidden ' : 'vacancy__description'}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <button
            className="description__button_hidden"
            type="button"
            onClick={this.expandText}
          >
            {textHidden ? 'ещё' : 'скрыть'}
          </button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search.search,
  tagName: state.search.tag,
  author: state.search.author,
  page: state.search.page

})

const mapDispatchToProps = {
  setStateModalForm,
  openModal,
  deleteArticle,
  searchSubmit
}
export default connect(mapStateToProps, mapDispatchToProps)(ArticleItem);
