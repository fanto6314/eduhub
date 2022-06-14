import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../../middleware/dbSync";

import groupService from "../../../../src/backend/services/GroupService";
import userService from "../../../../src/backend/services/UserService";

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const users = await groupService.getGroup(req.query.id);
            return res.status(StatusCodes.OK).send(users);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get group");
        }
    })
    .put(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const updatedGroup = await groupService.updateGroup(req.query.id, req.body.name, loggedInUser);
            return res.status(StatusCodes.OK).send(updatedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot update group");
        }
    })
    .delete(async (req, res) => {
        const loggedInUser = await userService.getLoggedInUser({req});
        try {
            const deletedGroup = await groupService.deleteGroup(req.query.id, loggedInUser);
            return res.status(StatusCodes.OK).send(deletedGroup);
        } catch (err) {
            console.error(err)
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot delete group");
        }
    });

export default handler;
