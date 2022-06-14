import { Box, Button } from '@chakra-ui/react'

function Actions() {
  return (
    <Box mt={5} py={5} px={8} borderTopWidth={1} borderColor="brand.light">
      <Button className='bg-[#183d1f] hover:bg-[#183d1f]/80'>Update</Button>
    </Box>
  )
}

export default Actions
