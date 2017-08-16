import React from 'react';

const routeDefaults = {
	layout: props => <props.route.content {...props}/>,
};

const rootRoute = {
	path: '/',
	exact: true,
	content: () => <div>Hello world</div>,
};

export default [
	rootRoute,
];

export {routeDefaults};
