import nc from "next-connect";
import dbSync from "../../../../../middleware/dbSync";
import userService from "../../../../../../../src/backend/services/UserService";
import fileService from "../../../../../../../src/backend/services/FileService";
import {StatusCodes} from "http-status-codes";

const handler = nc().use(dbSync)
    .delete(async (req, res) => {
        try {
            const loggedInUser = await userService.getLoggedInUser({req});
            const file = await fileService.deleteFile(req.query.id, req.query.parentId, req.query.fileId, loggedInUser);
            res.status(StatusCodes.CREATED).send(file);
        } catch (err) {
            console.error(err);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Cannot delete file");
        }
    });
export default handler;
