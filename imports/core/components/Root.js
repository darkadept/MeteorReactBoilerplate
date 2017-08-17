import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {NotificationSystem} from '@thx/notifications';
import {RouteDirector} from '@thx/router';
import routes, {routeDefaults} from '../data/routes';

export default function Root(props) {
	const {store} = props;
	return (
		<Provider store={store}>
			<NotificationSystem>
				<Router>
					<RouteDirector routes={routes} defaults={routeDefaults}/>
				</Router>
			</NotificationSystem>
		</Provider>
	);
}

Root.propTypes = {
	store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
