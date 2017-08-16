import {combineReducers} from 'redux-immutablejs';
import auth from './lib/userData/reducer';

export default combineReducers({
	auth,
});
