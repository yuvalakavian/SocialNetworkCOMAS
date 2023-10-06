const Group = require('../models/group');

const searchGroups = async ({ searchValue }) => {
    try {
        const groups = await Group.find({
            "name": { $regex: searchValue, $options: 'i' }
        });

        return groups;
    } catch (error) {
        console.error(`Error fetching groups: ${error.message}`);
        throw new Error(`Error fetching groups: ${error.message}`);
    }
};

const addGroups = async (groupId, userId) => {
    try {
        const group = await Group.findById(groupId);
        console.log(groupId);
        console.log(userId);

        if (!group) {
            console.error('Group not found');
            return null;
        } else {
            group.members.push(userId);
            await group.save();

            console.log('Group updated:', group);
            return group;
        }
    } catch (error) {
        console.error('Error in addGroups:', error);
        throw new Error(`Error adding member: ${error.message}`);
    }
};

const leaveGroups = async (groupId, userId) => {
    try {
        const group = await Group.findById(groupId);
        console.log(groupId);
        console.log(userId);


        if (!group) {
            console.error('Group not found');
        } else {
            group.members.remove(userId);
            await group.save();

            console.log('Group updated:', group);
        }
    } catch (error) {
        console.error(`Error removing group: ${error.message}`);
        throw new Error(`Error removing group: ${error.message}`);
    }
};

const removeGroup = async (groupId) => {
    try {
        const group = await Group.findByIdAndDelete(groupId);
        if (group) {
            console.log('Group deleted successfully:', group);
            return group;
        }
    } catch (error) {
        console.error(`Error deleting group: ${error.message}`);
        throw new Error(`Error deleting group: ${error.message}`);
    }
};

const createGroup = async (groupData) => {
    if (!groupData || !groupData.name || !groupData.description) {
        console.error('Invalid group data. Name and description are required.')
        throw new Error('Invalid group data. Name and description are required.')
    }

    const existingGroup = await Group.findOne({ name: groupData.name })
    if (existingGroup) {
        console.error('Group with the same name already exists.')
        throw new Error('Group with the same name already exists.')
    }

    const newGroup = new Group(groupData);
    console.log(newGroup);

    try {
        await newGroup.save()
        console.log('Group created successfully:', newGroup)
        return newGroup
    } catch (error) {
        console.error(`Error creating group: ${error.message}`)
        throw new Error(`Error creating group: ${error.message}`)
    }
};

module.exports = {
    searchGroups,
    addGroups,
    leaveGroups,
    removeGroup,
    createGroup
};