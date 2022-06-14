import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../../middleware/dbSync";

import groupService from "../../../../src/backend/services/GroupService";
import userService from "../../../../src/backend/services/UserService";

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const groupCode = await groupService.getGroupCode(req.query.id, loggedInUser);
            return res.status(StatusCodes.OK).send(groupCode);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get group code");
        }
    });

export default handler;
