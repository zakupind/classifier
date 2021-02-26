import {
  SUCCESS_SEARCH,
  NULL_SEARCH,
  NOT_RESULT_SEARCH,
  ONLOAD_SEARCH,
  SET_PARAMS_SEARCH
} from '../types';

const stateSearch = {
  articles: [],
  isFetching: false,
  statusSearch: '',
  count: void 0,
  search: '',
  tag: '',
  author: '',
  page: ''
};

export default function searchReducer(state = stateSearch, action) {
  switch (action.type) {
    case ONLOAD_SEARCH:
      return { ...state, isFetching: true, statusSearch: '' };
    case NULL_SEARCH:
      return { ...state, jobs: [], statusSearch: 'Введите данные в поля ввода' };
    case NOT_RESULT_SEARCH:
      return {
        ...state, articles: [], statusSearch: 'Статьи не найдены', isFetching: false,
      };
    case SET_PARAMS_SEARCH:
      const params = action.payload
      return {
        ...state, ...params
      }
    case SUCCESS_SEARCH:
      return {
        ...state, articles: action.payload.results, count: action.payload.count, statusSearch: 'Результаты поиска', isFetching: false,
      };

    default: return state;
  }
}
