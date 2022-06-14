const connection = require("../db/connection");
const {Group, User, Subject, Directory, File} = require("../model");
const {v4: uuidv4} = require('uuid');

module.exports = {
    getDirectory: async (groupId, directoryId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");

        const directory = await Directory.findByPk(directoryId, {include: [{model: Directory, as: "Child"}, File]});
        return directory;
    }, createDirectory: async (groupId, parentDirectoryId, directoryName, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const parentDirectory = await Directory.findByPk(parentDirectoryId, {include: [{model: Directory, as: "Child"}, File]});
        parentDirectory.createChild({name: directoryName});
        await parentDirectory.save();
        return await Directory.findByPk(parentDirectoryId, {include: [{model: Directory, as: "Child"}, File]});;
    }, deleteDirectory: async (groupId, directoryId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");

        const directory = await Directory.findByPk(directoryId);
        directory.destroy();
        return directory;
    }
}
