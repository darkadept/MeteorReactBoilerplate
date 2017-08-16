import {Meteor} from 'meteor/meteor';
import debug from 'debug';
import Roles from '../../collections/Roles';
import atb from '../../../core/lib/redux/actionTypeBuilder';

const d = debug('app:user:userData');

export const USER_DATA = atb.type('USER', 'DATA');

function buildUserData() {
	const roles = Meteor.user() ? Meteor.user().roles || [] : [];
	const permissions = Roles.find({name: {$in: roles}}).fetch().reduce((memo, v) => [...memo, ...v.permissions], []);
	return {
		user: Meteor.user(),
		permissions,
	};
}

/**
 * Copies logged in user data to state reactively.
 * @tag Action
 * @returns {ReduxAction}
 */
export function getUserData(firstRun = false) {
	d(`Getting user data. First run: ${firstRun}`);
	if (firstRun) {
		return {
			type: USER_DATA,
			data: buildUserData(),
		};
	}
	return {
		type: USER_DATA,
		meteor: {
			subscribe: () => Meteor.subscribe('userData'),
			get: () => buildUserData(),
		},
	};
}
