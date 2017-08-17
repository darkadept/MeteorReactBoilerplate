import {publish} from '@thx/auth/dist/server';

export default function serverStartup() {
	publish();
}
