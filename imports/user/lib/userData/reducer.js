import {Map} from 'immutable';
import debug from 'debug';
import atb from '../../../core/lib/redux/actionTypeBuilder';
import {USER_DATA} from './actions';

const d = debug('app:user:redux:reducer');

const initialState = new Map({
	user: null,
	permissions: [],
});

export default function(state = initialState, action) {
	const {type, data} = action;

	switch (type) {
		case atb.changed(USER_DATA):
		case USER_DATA:
			d('Setting user data');
			return state
				.set('user', data.user)
				.set('permissions', data.permissions);

		case 'USER_LOGOUT':
			return state
				.set('user', null)
				.set('permissions', []);

		default:
			return state;
	}
}
