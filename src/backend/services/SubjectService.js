const {Group, Subject, Directory} = require("../model");

module.exports = {
    getSubject: async (subjectId, loggedInUser) => {
        const subject = await Subject.findByPk(subjectId);
        const group = await subject.getGroup();
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        return subject;
    }, createSubject: async (groupId, subjectName, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if (!group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const subject = await Subject.create({name: subjectName});
        const rootDirectory = await Directory.create({name: subjectName + " - root"});
        subject.setRootDirectory(rootDirectory);
        group.addSubject(subject);
        await subject.save()
        await rootDirectory.save();
        await group.save();
        return subject;
    }, removeSubject: async (groupId, subjectId, loggedInUser) => {
        const group = await Group.findByPk(groupId);
        if (!group) throw Error("Group not found");
        if (!await group.hasUser(loggedInUser)) throw Error("You are not in this group!");
        const subject = await Subject.findByPk(subjectId);
        await group.removeSubject(subject);
        await group.save();
        await subject.destroy();
        return subject;
    }
}
