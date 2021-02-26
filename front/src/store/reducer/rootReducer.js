import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import editArticleReducer from './editArticleReducer';
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
  search: searchReducer,
  editArticle: editArticleReducer,
  errorReducer
});

export default rootReducer;
