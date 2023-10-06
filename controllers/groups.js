const groupsService = require('../service/groups')

const page = async (req, res) => {
    console.log(req.session.groupId)
    res.render('../views/groups/index.ejs', {groupId: req.session.groupId});
};

const searchGroups = async (req, res) => {
    try {
        const searchValue = req.query.searchValue;
        const groups = await groupsService.searchGroups({ searchValue });
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addGroups = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const groups = await groupsService.addGroups(groupId, userId);
        res.json(groups);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const leaveGroups = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const groups = await groupsService.leaveGroups(groupId, userId);
        res.json(groups);
    }
    catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
}

const removeGroup = async (req, res) => {
    const groupId = req.body.groupId;
    try {
        const group = await groupsService.removeGroup(groupId);
        res.json(group);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const createGroup = async (req, res) => {
    try {
        const group = await groupsService.createGroup(req.body);

        res.json(group);

    } catch (error) {
        console.error(`Error creating group: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    page,
    searchGroups,
    addGroups,
    leaveGroups,
    removeGroup,
    createGroup
}