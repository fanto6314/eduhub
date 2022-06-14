import {StatusCodes} from "http-status-codes";
import nc from "next-connect";
import dbSync from "../middleware/dbSync";

import groupService from "../../../src/backend/services/GroupService";
import userService from "../../../src/backend/services/UserService";


const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const groups = await groupService.getAllGroups();
            res.status(StatusCodes.CREATED).send(groups);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get group");
        }
    })
    .post(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await groupService.createGroup(req.body.name, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot create group");
        }
    });

export default handler;
