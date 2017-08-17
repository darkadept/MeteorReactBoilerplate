import {setConfig} from '@thx/auth';
import {Meteor} from 'meteor/meteor';
import Users from '../imports/user/collections/Users';
import Roles from '../imports/user/collections/Roles';

setConfig({
	Users,
	Roles,
	Meteor,
});
