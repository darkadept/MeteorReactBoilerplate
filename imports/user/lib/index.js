import {Match} from 'meteor/check';
import {userHasPermission} from '@thx/auth';

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
