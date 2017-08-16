import {createStore} from 'redux';
import rootReducer from '../../data/reducers';

export default function() {
	return createStore(rootReducer());
}
