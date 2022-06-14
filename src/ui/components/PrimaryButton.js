import {Button} from "@chakra-ui/react";

const PrimaryButton = ({label, isLoading,onClick, size="lg"}) => {
    return (<Button
        onClick={onClick}
        isLoading={isLoading}
        loadingText="Caricando.."
        size={size}
        bg={'blue.400'}
        color={'white'}
        _hover={{
            bg: 'blue.500',
        }}>
        {label}
    </Button>);
}

export default PrimaryButton;
