import { useEffect, useRef } from 'react';
import { PLUGIN_ID } from '../pluginId';

interface InitializerProps {
	setPlugin?: (pluginId: string) => void;
}

const Initializer = ({ setPlugin }: InitializerProps): null => {
	const ref = useRef(setPlugin);
	useEffect(() => {
		if (setPlugin) {
			ref.current(PLUGIN_ID);
		}
	}, []);
	return null;
};
export { Initializer };
