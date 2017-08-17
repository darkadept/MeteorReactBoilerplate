import React from 'react';
import debug from 'debug';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import {render} from 'react-dom';
import makeStore from '../imports/core/redux/makeStore';
import Root from '../imports/core/components/Root';
import clientStartup from '../imports/core/data/clientStartup';

const d = debug('app:client');

function begin() {
	const store = makeStore();
	clientStartup(store);
	render(<Root store={store}/>, document.getElementById('render-target'));
}

Meteor.startup(() => {
	if (Meteor.loggingIn()) {
		// Browser has a token and is trying to login, let's wait while it does so...
		d('Found a token in local storage, attempting login...');
		const handle = Meteor.subscribe('userData');
		let loaded = false;
		Tracker.autorun(() => {
			d(`Meteor logging in: ${Meteor.loggingIn()}, Handle ready: ${handle.ready()}`);
			if (!Meteor.loggingIn() && handle.ready()) { // begin() is only triggered once logging in stops and we have the current user data.
				if (!loaded) {
					loaded = true;
					begin();
				}
			}
		});
	} else {
		// Browser does not have a token and won't try to login
		d('Previous login token not found');
		begin();
	}
});
