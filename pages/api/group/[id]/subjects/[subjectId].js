import nc from "next-connect";
import dbSync from "../../../middleware/dbSync";
import userService from "../../../../../src/backend/services/UserService";
import subjectService from "../../../../../src/backend/services/SubjectService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .get(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await subjectService.getSubject(req.query.subjectId, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot get subject");
        }
    })
    .delete(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const group = await subjectService.removeSubject(req.query.id, req.query.subjectId, loggedInUser);
            res.status(StatusCodes.CREATED).send(group);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot delete subject");
        }
    });

export default handler;
