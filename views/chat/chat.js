// chat header example 
// <div class="row">
// <div class="col-lg-6">
//     <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
//         <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
//             alt="avatar">
//     </a>
//     <div class="chat-about">
//         <h6 class="m-b-0">Aiden Chavez</h6>
//         <small>Last seen: 2 hours ago</small>
//     </div>
// </div>
// </div>


//
//     <li class="clearfix">
//         <div class="message other-message float-right"> Hi Aiden, how are you? How
//             is the project coming along? </div>
//     </li>
//     <li class="clearfix">
//         <div class="message-data">
//             <span class="message-data-time">10:12 AM, Today</span>
//         </div>
//         <div class="message my-message">Are we meeting today?</div>
//     </li>
//     <li class="clearfix">
//         <div class="message-data">
//             <span class="message-data-time">10:15 AM, Today</span>
//         </div>
//         <div class="message my-message">Project has been already finished and I have
//             results to show you.</div>
//     </li>
// </ul>

const AVATAR_API_URL = "https://ui-avatars.com/api/"
const chatFrindsListElemets = []

const initChat = () => {
    $.ajax({
        url: "/chat/friends",
        method: "GET",
        success: function (data) {
            const chatFriendsElement = document.getElementById('chat-friends-list');
            chatFriendsElement.innerHTML = '';

            data.forEach(user => {
                const li = document.createElement('li');
                li.className = 'clearfix';
                li.id = user._id

                const img = document.createElement('img');
                img.src = user.profilePicture || `${AVATAR_API_URL}?name=${user.firstName}+${user.lastName}`;
                img.alt = 'avatar';

                const aboutDiv = document.createElement('div');
                aboutDiv.className = 'about';

                const nameDiv = document.createElement('div');
                nameDiv.className = 'name';
                nameDiv.textContent = `${user.firstName} ${user.lastName}`;

                const statusDiv = document.createElement('div');
                statusDiv.className = 'status';
                statusDiv.innerHTML = '<i class="fa fa-circle online"></i> online';

                aboutDiv.appendChild(nameDiv);
                aboutDiv.appendChild(statusDiv);
                li.appendChild(img);
                li.appendChild(aboutDiv);

                li.addEventListener('click', () => handleOnFriendClick(user));

                chatFriendsElement.appendChild(li);
                chatFrindsListElemets.push(li)
            });

        },
        error: function (error) {
            console.log(error);

        }
    }
    )

}

const handleOnFriendClick = (user) => {
    clearChatElements();
    console.log(user);
    const userElement = document.getElementById(user._id);
    console.log(userElement);
    
    userElement.classList.add('clearfix', 'active');
}


const clearChatElements = () => {
    //reset ui for active chat
    chatFrindsListElemets.forEach(element => element.classList = 'clearfix');
}

initChat()