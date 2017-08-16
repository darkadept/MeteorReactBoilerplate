const prefix = '@THR';

export default {
	type: (module, actionType) => `${prefix}/${module}/${actionType}`,
	ready: actionType => `${actionType}/ready`,
	changed: actionType => `${actionType}/changed`,
	error: actionType => `${actionType}/error`,
	unsubscribed: actionType => `${actionType}/unsubscribed`,
};
