import {Meteor} from 'meteor/meteor';
import Roles from '../../collections/Roles';

export default function() {
	Meteor.publishComposite('userData', function publish() {
		return {
			find() { // Find user data
				return Meteor.users.find({
					_id: this.userId,
				}, {
					fields: {
						profile: 1,
						roles: 1,
					},
				});
			},
			children: [
				{
					find(user) { // Find permissions
						return Roles.find({
							name: {$in: user.roles || []},
						}, {
							fields: {
								name: 1,
								permissions: 1,
							},
						});
					},
				},
			],
		};
	});
}
