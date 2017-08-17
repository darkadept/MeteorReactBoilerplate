import {combineReducers} from 'redux-immutablejs';
import {reducer as auth} from '@thx/auth';

export default function reducers() {
	return combineReducers({
		auth,
	});
}
