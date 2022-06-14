import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";

const InputField = ({id, type = "text", label, value, onChange, error}) => {
    return (<FormControl id={id} isRequired isInvalid={error}>
        <FormLabel>{label}</FormLabel>
        <Input type={type} onChange={onChange}
               value={value} isInvalid={error}/>
        <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>);
}

export default InputField;
