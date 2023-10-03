const onEnter = async (event) => {
    if (event.key === 'Enter') {
        const searchValue = document.getElementById("searchGroups").value.toLowerCase();

        $.ajax({
            url: "/groups/get-groups",
            method: "GET",
            data: {},
            success: function (data) {
                const currentGroup = data;
                console.log(data);

                $.ajax({
                    url: "/groups/search-groups",
                    method: "GET",
                    data: { searchValue: searchValue },
                    success: function (data) {
                        const filteredGroupsContainer = document.getElementById(
                            "filteredGroupsContainer"
                        );
                        filteredGroupsContainer.innerHTML = "";

                        data?.filter(group => group._id != currentGroup._id).forEach((group) => {
                            const groupElement = document.createElement("div");
                            groupElement.classList.add("d-flex", "justify-content-between", "align-items-center");

                            const nameElement = document.createElement("span");
                            nameElement.textContent = `${group.name}`;

                            groupElement.appendChild(nameElement);

                            const visitProfileButton = document.createElement("a");
                            visitProfileButton.textContent = "Visit Group";
                            visitProfileButton.classList.add("btn", "btn-info", "ml-auto");
                            visitProfileButton.style.width = "150px";
                            visitProfileButton.style.height = "40px";
                            visitProfileButton.style.marginRight = "5px";
                            visitProfileButton.href = `/group/profile/${group._id}`;

                            if (!currentGroup?.members.includes(group._id)) {
                                const buttonElement = document.createElement("button");
                                buttonElement.textContent = "Join Group";
                                buttonElement.classList.add("btn", "btn-success");
                                buttonElement.style.width = "150px";
                                buttonElement.style.height = "40px";

                                buttonElement.addEventListener('click', () => {
                                    console.log('click');
                                    $.ajax({
                                        url: "/groups/add-member",
                                        method: "POST",
                                        data: { groupId: group._id },
                                        success: function (data) {
                                            console.log(data);
                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                });

                                groupElement.appendChild(visitProfileButton);
                                groupElement.appendChild(buttonElement);

                            } else {
                                const buttonElement = document.createElement("button");
                                buttonElement.textContent = "Leave Group";
                                buttonElement.classList.add("btn", "btn-danger");
                                buttonElement.style.width = "150px";
                                buttonElement.style.height = "40px";

                                buttonElement.addEventListener('click', () => {
                                    $.ajax({
                                        url: "/groups/remove-member",
                                        method: "POST",
                                        data: { groupId: group._id },
                                        success: function (data) {
                                            console.log(data);
                                            groupElement.remove();
                                        },
                                        error: function (error) {
                                            console.log(error);
                                        }
                                    });
                                });

                                groupElement.appendChild(visitProfileButton);
                                groupElement.appendChild(buttonElement);
                            }

                            groupElement.style.marginBottom = "10px";

                            filteredGroupsContainer.appendChild(groupElement);
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
