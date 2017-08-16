import React from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import makeStore from '../imports/core/lib/redux/makeStore';

import Root from '../imports/core/components/Root';

Meteor.startup(() => {
	const store = makeStore();

	render(<Root store={store}/>, document.getElementById('render-target'));
});
