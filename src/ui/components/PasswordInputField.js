import {Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement} from "@chakra-ui/react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import useToggle from "../hooks/useToggle";

const PasswordInputField = ({value, onChange, error}) => {
    const [showPassword, toggleShowPassword] = useToggle(false);

    return (<FormControl id="password" isRequired isInvalid={error}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} onChange={onChange}
                   value={value} isInvalid={error}/>
            <InputRightElement h={'full'}>
                <Button
                    variant={'ghost'}
                    onClick={toggleShowPassword}>
                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                </Button>
            </InputRightElement>
        </InputGroup>

        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>);
}
export default PasswordInputField;
