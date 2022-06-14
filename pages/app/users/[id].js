import React from 'react';
import Sidebar from '../../../src/ui/components/Sidebar/Sidebar';
import { useRouter } from 'next/router'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../../../src/ui/theme'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  return(
      <div className="flex max-w-md justify-center justify-items-center">
        {/* set an image as a background and make it repeat */}
        <div className="bg-cover bg-center bg-no-repeat bg-gray-200 h-screen w-full" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)'}}>
          <div className="flex flex-col items-center justify-center h-full">
            <ChakraProvider theme={theme}>
              <Sidebar />
            </ChakraProvider>

            </div>
          </div>
      </div>
  )
}
export default User