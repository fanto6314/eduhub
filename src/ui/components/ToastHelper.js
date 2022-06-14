import {createStandaloneToast} from '@chakra-ui/react'

const toastObject = createStandaloneToast()

export default function toast (title = "", description = "", status = "success") {
    toastObject({
        title, description, status, duration: 9000, isClosable: true, position:"top-right"
    });
};
