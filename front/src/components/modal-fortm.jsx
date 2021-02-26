import React from 'react'

import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop';
import FormArticle from './form-article'

import {
    openModal,
    closeModal,
    setStateModalForm
} from '../store/action'

function ModalForm (props) {

    return (
        <div className="background-modal">
        <Modal
            open={props.isModalOpen}
            onClose={props.closeModal}
            BackdropComponent={Backdrop}
            className="modal__wrapper"
        >
            <FormArticle />
        </Modal>
    </div>
    )
}

const mapStateToProps = (state) => ({
    isModalOpen: state.editArticle.isModalOpen
})

const mapDispatchToProps = {
    openModal,
    closeModal,
    setStateModalForm
}

export default connect (mapStateToProps, mapDispatchToProps)(ModalForm)

