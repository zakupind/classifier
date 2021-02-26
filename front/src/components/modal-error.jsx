import React from 'react'

import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';

import cancel from '../img/cancel.svg'

import {
    openModalError,
    closeModalError
} from '../store/action'

function ModalError (props) {
    return (
        <div className="background-modal">
            <Modal
                open={props.isOpenModalError}
                onClose={props.closeModalError}
                BackdropComponent={Backdrop}
                className="modal__wrapper modal-error"
            >
                <div className="modal-error__wrapper">
                    <div className="article-form__button_wrapper error-form__button_close">
                        <button className="form-article__button_cancel" onClick={() => props.closeModalError()}>
                            <img src={cancel} alt="cancel" width="30px" />
                        </button>
                    </div>
                    <div className="error-form__payload">
                        <span className="error-form__code">{props.codeError}</span>
                        <span className="error-form__text">{props.textError}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isOpenModalError: state.errorReducer.isOpenModalError,
    codeError: state.errorReducer.codeError,
    textError: state.errorReducer.textError
})

const mapDispatchToProps = {
    openModalError,
    closeModalError
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalError)