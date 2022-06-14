const {Group,  Directory, File} = require("../model");
const publishFileUploadEvent = require("../messagebroker/messageBroker");

module.exports = {
    createFile: async (groupId, parentDirectoryId, fileName, fileUrl, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const parentDirectory = await Directory.findByPk(parentDirectoryId);
        parentDirectory.createFile({name: fileName, url: fileUrl});
        await parentDirectory.save();
        const messagePayload = {
            userEmails: [],
            group:group.name,
            file: {
                name: fileName,
                url: fileUrl
            }
        };
        const users = await group.getUsers();
        console.log(users);
        users.forEach(user=>{
            console.log(user.email)
            messagePayload.userEmails.push(user.email);
        });

        await publishFileUploadEvent(messagePayload);
        return await Directory.findByPk(parentDirectoryId, {include: [{model: Directory, as: "Child"}, File]});;
    }, deleteFile: async (groupId, parentDirectoryId, fileId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const file = await File.findByPk(fileId);
        await file.destroy()
        return file;
    }
}
