import {Meteor} from 'meteor/meteor';
import serverStartup from '../imports/core/data/serverStartup';

Meteor.startup(() => {
	serverStartup();
});
