import {
    OPEN_MODAL_FORM,
    CLOSE_MODAL_OPEN,
    SET_STATE_MODAL_FORM,
    SUBMIT_FORM_EDIT_ARTICLE
} from '../types'

const stateEditArticle = {
    isOpenModal: false,
    id: '',
    title: '',
    tag: 'истории',
    secondTitle: '',
    author: '',
    authorUrl: '',
    content: '',
    date: ''
}

export default function editArticleReducer (state = stateEditArticle, action) {
    switch (action.type) {
        case OPEN_MODAL_FORM:
            return {...state, isModalOpen: true}
        case CLOSE_MODAL_OPEN:
            return {...state, isModalOpen: false} 
        case SET_STATE_MODAL_FORM:
            return {...state, ...action.payload}
        case SUBMIT_FORM_EDIT_ARTICLE:

        default: return state
    }
}