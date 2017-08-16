import {Meteor} from 'meteor/meteor';
import {Match} from 'meteor/check';
import intersection from 'lodash/intersection';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import Roles from '../collections/Roles';
import {SYSADMIN} from '../permissions';

/**
 * Checks whether a user has a certain permission or not.
 * @param {object|string} authStateOrId - Pass in either the auth state tree (for client) or a user ID (for server).
 * @param {string|string[]} permission - Permission constant or array of permission constants.
 * @returns {boolean} - Returns true if the user has the specified permission(s).
 */
export function userHasPermission(authStateOrId, permission) {
	const matchPerms = isArray(permission) ? [...permission, SYSADMIN] : [permission, SYSADMIN];

	if (isObject(authStateOrId)) {
		if (!authStateOrId.get('user')) return false;
		return intersection(authStateOrId.get('permissions'), matchPerms).length > 0;
	}

	const user = Meteor.users.findOne(authStateOrId);
	if (!user) return false;
	return Roles.findOne({$and: [
		{name: {$in: user.roles}},
		{permissions: {$in: matchPerms}},
	]}) !== null;
}

/**
 * On the server: check(userId, new HasPermission(PERMISSION));
 * On the client: check(authState, new HasPermission(PERMISSION));
 */
export class HasPermission extends Match.Where {
	constructor(permission) {
		super();
		this._permission = permission;
	}

	condition = obj => {
		if (!userHasPermission(obj, this._permission)) {
			throw new Match.Error('Permission denied');
		}
		return true;
	}
}
