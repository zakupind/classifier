import {
    OPEN_MODAL_ERROR,
    CLOSE_MODAL_ERROR
} from '../types'

const stateError = {
    isOpenModalError: false,
    codeError: '',
    textError: ''
}

export default function errorReducer (state = stateError, action) {
    switch (action.type) {
        case OPEN_MODAL_ERROR:
            return {...state, isOpenModalError: true, ...action.payload}

        case CLOSE_MODAL_ERROR:
            return {...state, isOpenModalError: false, codeError: '', textError: ''}

        default: return state

    }
} 