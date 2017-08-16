import React from 'react';
import {Route, Switch} from 'react-router-dom';
import TPropTypes from '@thx/tproptypes';
import NotFound from '../../components/NotFound';

export default function SwitchWithError(props) {
	return (
		<Switch>
			{props.children}
			<Route component={NotFound}/>
		</Switch>
	);
}

SwitchWithError.propTypes = {
	children: TPropTypes.reactElements,
};
