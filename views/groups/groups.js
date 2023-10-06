const createButtonElement = (buttonName, buttonColor) => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = buttonName;
    buttonElement.classList.add("btn", buttonColor);
    buttonElement.style.width = "150px";
    buttonElement.style.height = "40px";
    buttonElement.style.marginRight = "5px";

    return buttonElement;
}

const joinGroup = (groupElement, group, currentUser, joinButtonElement, leaveButtonElement) => {
    console.log('click Join Group');
    $.ajax({
        url: "/groups/add-groups",
        method: "POST",
        data: { groupId: group._id, userId: currentUser._id },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    groupElement.removeChild(joinButtonElement);
    groupElement.appendChild(leaveButtonElement);
}

const removeGroup = (group, removeButtonElement) => {

    const confirmation = confirm("Are you sure you want to remove this group?");
    
    if (confirmation) {
        console.log('User confirmed removal');
        $.ajax({
            url: "/groups/remove-group",
            method: "POST",
            data: { groupId: group._id },
            success: function (data) {
                console.log(data);
                window.location.reload();
            },
            error: function (error) {
                console.log(error);
            }
        });
    } else {
        console.log('User canceled removal');
    }
}

const leaveGroup = (groupElement, group, currentUser, joinButtonElement, leaveButtonElement) => {
    console.log('click Leave Group');
    $.ajax({
        url: "/groups/leave-groups",
        method: "POST",
        data: { groupId: group._id, userId: currentUser._id },
        success: function (data) {
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
    });
    groupElement.removeChild(leaveButtonElement);
    groupElement.appendChild(joinButtonElement);
}

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/users/get-user",
            method: "GET",
            data: {},
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
};

const onEnter = async (event) => {
    if (event.key === 'Enter') {
        const searchValue = document.getElementById("searchGroups").value.toLowerCase();

        try {
            const currentUser = await getCurrentUser();
            console.log(currentUser);

            $.ajax({
                url: "/groups/search-groups",
                method: "GET",
                data: { searchValue: searchValue },
                success: function (data) {
                    const filteredGroupsContainer = document.getElementById(
                        "filteredGroupsContainer"
                    );
                    filteredGroupsContainer.innerHTML = "";

                    data?.forEach((group) => {
                        const groupElement = document.createElement("div");
                        groupElement.classList.add("d-flex", "justify-content-between", "align-items-center");

                        const nameElement = document.createElement("span");
                        nameElement.textContent = `${group.name}`;

                        groupElement.appendChild(nameElement);

                        const joinButtonElement = createButtonElement("Join Group", "btn-success");
                        const leaveButtonElement = createButtonElement("Leave Group", "btn-danger");
                        const removeButtonElement = createButtonElement("Remove Group", "btn-warning");

                        let isMember = group.members.includes(currentUser._id);
                        let isAdmin = group.admin === currentUser._id;

                        if (isAdmin) {
                            groupElement.appendChild(removeButtonElement);

                        } else if (isMember) {
                            groupElement.appendChild(leaveButtonElement);

                        } else {
                            groupElement.appendChild(joinButtonElement);
                        }

                        joinButtonElement.addEventListener('click', () => {
                            joinGroup(groupElement, group, currentUser, joinButtonElement, leaveButtonElement);
                        });

                        leaveButtonElement.addEventListener('click', () => {
                            leaveGroup(groupElement, group, currentUser, joinButtonElement, leaveButtonElement);
                        });

                        removeButtonElement.addEventListener('click', () => {
                            removeGroup(group, removeButtonElement);
                        });

                        groupElement.style.marginBottom = "10px";
                        filteredGroupsContainer.appendChild(groupElement);
                    });
                },
                error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the "Create Group" button
    document.getElementById("createGroupButton").addEventListener('click', () => {
        $('#createGroupModal').modal('show');
    });

    document.getElementById("createGroupSubmit").addEventListener('click', async () => {
        const groupName = document.getElementById("groupName").value;
        const groupDescription = document.getElementById("groupDescription").value;
        const currentUser = await getCurrentUser();

        if (!groupName) {
            alert("Please enter a group name.");
            return;
        }

        $.ajax({
            url: "/groups/create-group",
            method: "POST",
            data: {
                name: groupName,
                description: groupDescription,
                posts: [],
                members: [currentUser._id],
                admin: currentUser._id
            },
            success: function (data) {
                console.log(data);
                $('#createGroupModal').modal('hide');
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    document.getElementById("searchGroups").addEventListener('keyup', onEnter);
});