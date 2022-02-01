import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../src/theme'
import '../src/theme/styles.css'


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
 
}

export default MyApp
