import nc from "next-connect";
import dbSync from "../../../middleware/dbSync";
import userService from "../../../../../src/backend/services/UserService";
import groupService from "../../../../../src/backend/services/GroupService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .delete(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await groupService.removeUserFromGroup(req.query.id, loggedInUser, req.query.userId);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot remove user from group");
        }
    });

export default handler;
