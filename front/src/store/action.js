import _ from 'lodash'
import format from 'date-fns/format'

import {
  SUCCESS_SEARCH,
  ONLOAD_SEARCH,
  NULL_SEARCH,
  NOT_RESULT_SEARCH,
  SET_PARAMS_SEARCH,
  OPEN_MODAL_FORM,
  CLOSE_MODAL_OPEN,
  SET_STATE_MODAL_FORM,
  OPEN_MODAL_ERROR,
  CLOSE_MODAL_ERROR
} from './types';

export function searchSuccess(payload) {
  return {
    type: SUCCESS_SEARCH,
    payload,
  };
}

export function searchNull() {
  return {
    type: NULL_SEARCH,
  };
}

export function searchNotResult() {
  return {
    type: NOT_RESULT_SEARCH,
  };
}

export function openModalError (payload) {
  return {
    type: OPEN_MODAL_ERROR,
    payload
  };
}

export function closeModalError () {
  return {
    type: CLOSE_MODAL_ERROR
  };
}

export function searchOnload() {
  return {
    type: ONLOAD_SEARCH,
  };
}

export function setParamsSearch (payload) {
  return {
    type: SET_PARAMS_SEARCH,
    payload
  }
}

export function searchSubmit(payload) {
  return (dispatch) => {
    dispatch(searchOnload());

    const searchUrl = new URL('http://127.0.0.1:8000/api/articles/');
    const params = {
      search: payload.search,
      tag: payload.tag,
      author: payload.author,
      page: payload.page
    };

    Object.keys(params).forEach((key) => searchUrl.searchParams.append(key, params[key]));

    fetch(searchUrl)
      .then((response) => (response.ok ? response : Promise.reject(response)))
      .then((response) => response.json())
      .then((response) => {
        if (response.results.length === 0) {
          dispatch(searchNotResult());
        } else {
          dispatch(searchSuccess(response));
        }
      })
      .catch(() => openModalError({textError: 'Что то пошло не так'}))
  };
}

export function openModal () {
  return {
    type: OPEN_MODAL_FORM
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL_OPEN
  }
}

export function setStateModalForm (payload) {
  return {
    type: SET_STATE_MODAL_FORM,
    payload: payload
  }
}

export function submitAddForm (payload) {
  let body = _.omit(payload, [
    'closeModal',
    'setStateModalForm',
    'submitModalForm',
    'tabIndex'
  ])

  const date = format(new Date(), 'dd.MM.yyyy')

  body = {...body, date}

  return () => {
    const searchUrl = new URL('http://localhost:8000/api/articles/');

    fetch(searchUrl, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: "POST",
      body: JSON.stringify(body)
    })
    .then((res) => {
      if (res.ok) {
        closeModal()
      }
    })
    .catch(() => openModalError({textError: 'Что то пошло не так'}))
  };
}

export function sumbitEditForm (payload) {
  const url = new URL('http://localhost:8000/api/articles/');

  const body = _.omit(payload, [
    'closeModal',
    'setStateModalForm',
    'submitModalForm',
    'tabIndex'
  ])

  return () => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      method: "PUT",
      body: JSON.stringify(body)
    })
    .then(() => {
      openModalError({textError: 'Статья Успешно изменена'})
    })
    .catch(() => openModalError({textError: 'Что то пошло не так'}))
  }
}

export function deleteArticle (payload) {
  return () => {
    const url = new URL(`http://127.0.0.1:8000/api/articles/?id=${payload}`)

    fetch(url, {
      method: "DELETE"
    })
      .then((res) => console.log(res))
    .catch(() => openModalError({textError: 'Что то пошло не так'}))
  }
}
