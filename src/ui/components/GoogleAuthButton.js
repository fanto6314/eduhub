import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";
import {Button, Center, Text} from "@chakra-ui/react";

export default function GoogleAuthButton() {
    return (
        <Button
            onClick={() => signIn("google")}
            w={'full'}
            maxW={'md'}
            variant={'outline'}
            leftIcon={<FcGoogle/>}>
            <Center>
                <Text>Accedi con google</Text>
            </Center>
        </Button>);
}
