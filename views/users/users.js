$(document).ready(function () {
    const getUser = () => {
        return $.ajax({
            url: "/users/get-user",
            method: "GET"
        });
    };

    const searchUsers = (searchValue) => {
        return $.ajax({
            url: "/users/search-users",
            method: "POST",
            data: { searchValue: searchValue }
        });
    };

    const addFriend = (friendId) => {
        return $.ajax({
            url: "/users/add-friend",
            method: "POST",
            data: { friendId: friendId }
        });
    };

    const renderUserElement = (user, currentUser, container) => {
        const userElement = $("<div>").addClass("d-flex justify-content-between align-items-center");
        const nameElement = $("<span>").text(`${user.firstName} ${user.lastName}`);
        userElement.append(nameElement);

        const buttonElement = $("<button>").addClass("btn btn-primary");
        if (!currentUser?.friends.includes(user._id)) {
            buttonElement.text("Add friend");
            buttonElement.on('click', async () => {
                try {
                    await addFriend(user._id);
                    console.log('Friend added successfully.');
                } catch (error) {
                    console.log(error);
                }
            });
        } else {
            buttonElement.text("Friend").addClass("btn-success disabled");
        }
        userElement.append(buttonElement);
        userElement.css("margin-bottom", "10px");
        container.append(userElement);
    };

    const onEnter = async (event) => {
        if (event.key === 'Enter') {
            const searchValue = $("#searchUsers").val().toLowerCase();
            const currentUser = await getUser();

            try {
                const data = await searchUsers(searchValue);
                const filteredUsersContainer = $("#filteredUsersContainer");
                filteredUsersContainer.empty();

                data?.filter(user => user._id !== currentUser._id).forEach((user) => {
                    renderUserElement(user, currentUser, filteredUsersContainer);
                });
            } catch (error) {
                console.log(error);
            }
        }
    };

    $("#searchUsers").on('keydown', onEnter);
});
