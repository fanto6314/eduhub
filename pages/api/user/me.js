import {StatusCodes} from "http-status-codes";
import nc from "next-connect";

const userService = require("../../../src/backend/services/UserService");
const dbSync = require("../middleware/dbSync");

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        const groups = await (await userService.getLoggedInUser({req}))
        res.status(StatusCodes.OK).send(groups);
    });
export default handler;
