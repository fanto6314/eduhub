import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import {verifyPassword} from "../../../src/backend/services/passwordEncrypter";
import {createUserOAuth} from "../../../src/backend/services/UserService";
import User from "../../../src/backend/model/User";

export default async function auth(req, res) {
    return await NextAuth(req, res, {
        pages: {
            signIn: "/auth/singin", newUser: "/app"
        }, jwt: {
            secret: process.env.NEXTAUTH_SECRET,
        }, secret: process.env.NEXTAUTH_SECRET, providers: [CredentialsProvider({
            async authorize(credentials) {
                const checkExisting = await User.findOne({where: {email: credentials.email}});
                if (!checkExisting || checkExisting.isOAuth) {
                    return;
                }
                const isValid = verifyPassword(credentials.password, checkExisting.password,);

                if (!isValid) return;

                return {id: checkExisting.id, name: checkExisting.name, email: checkExisting.email};
            },
        }), GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent", access_type: "offline", response_type: "code"
                }
            },
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        })], callbacks: {
            async redirect({baseUrl}) {
                return baseUrl + "/app";
            },
            async signIn({profile}) {
                if (profile) {
                    try {
                        await createUserOAuth(profile.name, profile.email, profile.picture);
                        return true;
                    } catch (err) {
                        res.redirect("/auth/singin");
                        return false;
                    }
                }
                return true;
            }
        },
    })
};
