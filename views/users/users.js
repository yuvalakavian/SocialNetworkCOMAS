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
                    method: "POST",
                    data: { searchValue: searchValue },
                    success: function (data) {
                        const filteredUsersContainer = document.getElementById(
                            "filteredUsersContainer"
                        );
                        filteredUsersContainer.innerHTML = "";
        
                        data?.filter(user => user._id != currentUser._id).forEach((user) => {
                            const userElement = document.createElement("div");
                            userElement.classList.add("d-flex", "justify-content-between", "align-items-center");
        
                            const nameElement = document.createElement("span");
                            nameElement.textContent = `${user.firstName} ${user.lastName}`;
        
                            userElement.appendChild(nameElement);

                            if (!currentUser?.friends.includes(user._id)) {
                                const buttonElement = document.createElement("button");
                                buttonElement.textContent = "Add friend";
                                buttonElement.classList.add("btn", "btn-primary");
                                buttonElement.addEventListener('click', () => {
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
                                });
        
                                userElement.appendChild(buttonElement);
                            } else {
                                const buttonElement = document.createElement("button");
                                buttonElement.textContent = "Friend";
                                buttonElement.classList.add("btn", "btn-success", "disabled");
                                userElement.appendChild(buttonElement);
                            }
        
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