import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../src/theme';
import '../src/theme/styles.css';

import { useUserData } from '../src/lib/hooks';
import UserDataProvider from '../src/lib/UserDataProvider';

function MyApp({ Component, pageProps }) {
	const userData = useUserData();
	return (
	<UserDataProvider>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
			</UserDataProvider>
		
	);
}

export default MyApp;
