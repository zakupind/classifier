import React, { Component } from 'react'
import ModalForm from '../../components/modal-fortm'

import ClassifierForm from './classifier-form'

export default class Classifier extends Component {
    render () {
        return (
            <React.Fragment>
                <ClassifierForm />
                <ModalForm />
            </React.Fragment>
        )
    }
}
