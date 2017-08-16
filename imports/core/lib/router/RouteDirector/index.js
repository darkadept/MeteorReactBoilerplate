import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {clearAllMessages} from '@thx/messages';
import debug from 'debug';
import Reroute from '../Reroute';
import SwitchWithError from '../SwitchWithError';

const d = debug('app:core:RouteDirector');

export default class RouteDirector extends Component {
	static contextTypes = {
		store: PropTypes.object,
	};

	static propTypes = {
		routes: PropTypes.arrayOf(PropTypes.shape({
			path: PropTypes.string.isRequired,
			exact: PropTypes.bool,
			strict: PropTypes.bool,
			redirect: PropTypes.bool,
			permissions: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
			layout: PropTypes.func,
		})).isRequired,
		defaults: PropTypes.shape({
			exact: PropTypes.bool,
			strict: PropTypes.bool,
			redirect: PropTypes.bool,
			permissions: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
			layout: PropTypes.func,
		}),
	};

	componentWillUpdate() {
		clearAllMessages(this.context.store);
	}

	doRender = (props, route) => {
		d('Rendering route', props, route);
		return <route.layout route={route} {...props}/>;
	};

	render() {
		d('Render', this.props);
		const defaultRoute = this.props.defaults ? this.props.defaults : {};

		return (
			<SwitchWithError>
				{this.props.routes.map(route => {
					const theRoute = Object.assign({}, defaultRoute, route);
					return <Reroute key={theRoute.path} render={props => this.doRender(props, theRoute)} {...theRoute}/>;
				})}
			</SwitchWithError>
		);
	}
}
