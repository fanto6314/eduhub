import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignOut() {
    signOut();
    const router = useRouter();
    useEffect(() => {
        router.push("/auth/sign-in");
    }
    , [router]);
    return <p>You have been signed out</p>;
}