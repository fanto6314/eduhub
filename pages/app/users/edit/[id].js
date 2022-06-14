import { theme } from '../../../../src/ui/theme'
import Cover from '../../../../src/ui/components/Cover'
import Main from '../../../../src/ui/components/Main'
import { ChakraProvider } from '@chakra-ui/react'
import SimpleBar from 'simplebar-react'

export default function App() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <ChakraProvider theme={theme}>
        <Cover />
        <Main />
      </ChakraProvider>
    </SimpleBar>
  )
}
