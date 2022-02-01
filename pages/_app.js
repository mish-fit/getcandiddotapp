import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';
import '../src/theme/styles.css';

import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {
	const userData = useUserData();
	return (
		<UserContext.Provider value={userData}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</UserContext.Provider>
	);
}

export default MyApp;
