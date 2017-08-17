import {createStore, compose} from 'redux';
import {Map} from 'immutable';
import rootReducer from '../data/reducers';

export default function() {
	const devtoolsExt = global.devToolsExtension && global.devToolsExtension();

	return createStore(rootReducer(), new Map(), compose(devtoolsExt || (f => f)));
}
