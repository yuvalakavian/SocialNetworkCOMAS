const Group = require('../models/group');

const getGroups = async ({ id }) => {

    try {
        const group = await Group.findOne(id);

        return group;
    } catch (error) {
        console.error(`Error fetching groups: ${error.message}`);
        throw new Error(`Error fetching groups: ${error.message}`)
    }
};

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

        if (!group) {
          console.error('Group not found');
        } else {
          group.members.push(userId);
          await group.save();

          console.log('Group updated:', group);
        }
    } catch (error) {
        console.error(`Error adding member: ${error.message}`);
        throw new Error(`Error adding member: ${error.message}`)
    }
};

const removeGroups = async (userId, groupId) => {
    try {
        const group = await Group.findById(userId);

        if (!user) {
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


module.exports = {
    getGroups,
    searchGroups,
    addGroups,
    removeGroups
};