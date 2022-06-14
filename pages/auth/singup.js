import {
    Flex, Box, Stack, Heading, Text, useColorModeValue, Link, Center,
} from '@chakra-ui/react';
import {useFormik} from "formik";
import GoogleAuthButton from "../../src/ui/components/GoogleAuthButton";
import InputField from "../../src/ui/components/InputField";
import PasswordInputField from "../../src/ui/components/PasswordInputField";
import PrimaryButton from "../../src/ui/components/PrimaryButton";
import {StatusCodes} from "http-status-codes";
import useToggle from "../../src/ui/hooks/useToggle";
import toast from "../../src/ui/components/ToastHelper";
import axios from "axios";
import {signIn} from "next-auth/react";
import userSchema from "../../src/shared/modelValidationSchema/userSchema";

export default function Signup() {
    const [loading, toggleLoading] = useToggle(false);

    const handleSubmit = async () => {
        const {username, email, password} = formik.values;
        userSchema.validate(formik.values)
        toggleLoading();
        try {
            const response = await axios.post("/api/user", {username, email, password});
            signIn("credentials", {
                email: response.data.email, password, redirect: true
            });
        } catch (error) {
            toggleLoading();
            if (error.response.status === StatusCodes.CONFLICT) {
                toast("Utente già esistente", "Un account con questa email esiste già", "error")
            }
        }
    };
    const formik = useFormik({
        initialValues: {
            username: '', email: '', password: '',
        }, onSubmit: handleSubmit, validationSchema: userSchema, validateOnBlur: true
    });

    return (<Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={12}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Crea un Account
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    Per usufruire degli splendidi vantaggi di EduHub!
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>
                    <InputField id={"username"} label={"Username"} value={formik.values.username}
                                onChange={formik.handleChange} error={formik.errors.username}/>

                    <InputField id={"email"} type={"email"} label={"Indirizzo email"}
                                value={formik.values.email}
                                onChange={formik.handleChange} error={formik.errors.email}/>

                    <PasswordInputField value={formik.values.password} onChange={formik.handleChange}
                                        error={formik.errors.password}/>

                    <PrimaryButton onClick={formik.handleSubmit} label={"Crea account"} isLoading={loading}/>
                    <Text align={'center'} pt={6}>
                        Hai già un account? <Link color={'blue.400'} href={"./singin"}>Accedi</Link>
                    </Text>
                    <Center p={8}>
                        <GoogleAuthButton/>
                    </Center>
                </Stack>
            </Box>
        </Stack>
    </Flex>);
}
