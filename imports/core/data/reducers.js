import {combineReducers} from 'redux-immutablejs';
import user from '../../user/reducers';

export default function reducers() {
	return combineReducers({
		user,
	});
}
