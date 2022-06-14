import {Group} from "../model";

const {User} = require("../model");
import {hashPassword} from "./passwordEncrypter";
import {getToken} from "next-auth/jwt";

module.exports = {
    createUser: async (createUserPayload) => {
        const checkExisting = await User.findOne({where: {email: createUserPayload.email}});
        if (checkExisting) throw Error("User already exists");
        return await User.create({
            name: createUserPayload.username,
            email: createUserPayload.email,
            password: hashPassword(createUserPayload.password),
            isOAuth: false
        }).catch(err => console.log(err));
    }, createUserOAuth: async (name, email, picture) => {
        const checkExisting = await User.findOne({where: {email: email}});
        if (checkExisting && !checkExisting.isOAuth) throw Error("User already exists");
        if (!checkExisting) {
            return await User.create({
                name: name, email: email, picture: picture, isOAuth: true
            }).catch(err => console.log(err));
        }
        return checkExisting;
    }, getLoggedInUser: async (req) => {
        const email = (await getToken(req)).email;
        return await User.findOne({where: {email: email}, include: Group});
    }
}
