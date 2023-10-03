const createButtonElement = (buttonName, buttonColor, href = null, additionalClass = "") => {
    const buttonElement = document.createElement(href ? "a" : "button");
    buttonElement.textContent = buttonName;
    buttonElement.classList.add("btn", buttonColor);
    buttonElement.style.width = "150px";
    buttonElement.style.height = "40px";
    buttonElement.style.marginRight = "5px";

    if (additionalClass) {
        buttonElement.classList.add(additionalClass);
    }

    if (href) {
        buttonElement.href = href;
    }

    return buttonElement;
}

const onEnter = async (event) => {
    if (event.key === 'Enter') {
        const searchValue = document.getElementById("searchUsers").value.toLowerCase();

        $.ajax({
            url: "/users/get-user",
            method: "GET",
            data: {},
            success: function (data) {
                const currentUser = data;
                console.log(data);

                $.ajax({
                    url: "/users/search-users",
                    method: "GET",
                    data: { searchValue: searchValue },
                    success: function (data) {
                        const filteredUsersContainer = document.getElementById(
                            "filteredUsersContainer"
                        );
                        filteredUsersContainer.innerHTML = "";

                        data?.filter(user => user._id != currentUser._id).forEach((user) => {
                            const userElement = document.createElement("div");
                            userElement.setAttribute("id", user._id);
                            userElement.classList.add("d-flex", "justify-content-between", "align-items-center");

                            const nameElement = document.createElement("span");
                            nameElement.textContent = `${user.firstName} ${user.lastName}`;

                            userElement.appendChild(nameElement);

                            const visitButtonElement = createButtonElement("Visit Profile", "btn-info", `/user/profile/${user._id}`, "ml-auto");
                            const addButtonElement = createButtonElement("Add Friend", "btn-success");
                            const removeButtonElement = createButtonElement("Remove Friend", "btn-danger");

                            addButtonElement.addEventListener('click', () => {
                                console.log('click');
                                $.ajax({
                                    url: "/users/add-friend",
                                    method: "POST",
                                    data: { friendId: user._id },
                                    success: function (data) {
                                        console.log(data);
                                    },
                                    error: function (error) {
                                        console.log(error);
                                    }
                                });
                                document.getElementById(user._id).appendChild(removeButtonElement);
                                document.getElementById(user._id).removeChild(addButtonElement);
                            });

                            removeButtonElement.addEventListener('click', () => {
                                $.ajax({
                                    url: "/users/remove-friend",
                                    method: "POST",
                                    data: { userId: currentUser._id, friendId: user._id },
                                    success: function (data) {
                                        document.getElementById(user._id + "-remove").innerHTML = addButtonElement;
                                        console.log(data);
                                    },
                                    error: function (error) {
                                        console.log(error);
                                    }
                                });
                                document.getElementById(user._id).appendChild(addButtonElement);
                                document.getElementById(user._id).removeChild(removeButtonElement);
                            });

                            userElement.appendChild(visitButtonElement);
                            userElement.appendChild(!currentUser?.friends.includes(user._id) ? addButtonElement : removeButtonElement);
                            userElement.style.marginBottom = "10px";
                            filteredUsersContainer.appendChild(userElement);

                        });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}