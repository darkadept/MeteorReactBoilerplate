import React from 'react';
import {SYSADMIN} from '@thx/auth';

const routeDefaults = {
	layout: props => <props.route.content {...props}/>,
};

const rootRoute = {
	path: '/',
	exact: true,
	content: () => <div>Hello world</div>,
	permissions: SYSADMIN,
};

export default [
	rootRoute,
];

export {routeDefaults};
