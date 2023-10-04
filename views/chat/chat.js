const AVATAR_API_URL = "https://ui-avatars.com/api/"
const SOCKET_CONNECTION = 'http://localhost:8080'
const JOIN_CHAT = 'join chat'
const LEAVE_CHAT = 'leave chat'
const SEND_MESSAGE = 'send message'
const DISCONNECT = 'disconnect'

const socket = io(SOCKET_CONNECTION);

let currentChatId = ""
const chatFrindsListElemets = []

const joinChat = (chatId) => {
    socket.emit('join chat', chatId);
}

socket.on(SEND_MESSAGE, (message) => {
    renderMessage(message, new Date(), true);
});

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
    const userElement = document.getElementById(user._id);
    userElement.classList.add('clearfix', 'active');
    //render chat header
    renderChatHeader(user)

    $.ajax({
        url: `/chat/${user._id}`,
        method: "GET",
        success: function (data) {
            // connect to chat socket 
            currentChatId = data._id
            joinChat(currentChatId)
        },
        error: (error) => {
            $.ajax({
                url: `/chat/${user._id}`,
                method: "POST",
                success: function (data) {
                    // connect to chat socket
                    currentChatId = data._id
                    joinChat(currentChatId)
                    console.log("create chat was successfuly", data);
                },
                error: (error) => {
                    console.log("failed to create chat", error);
                }
            })
        }
    });

}

const sendMessage = (e) => {
    if(e.keyCode === 13){
        const message = e.target.value;
        renderMessage(message)
        socket.emit('send message', { chatId: currentChatId, message });
        clearMessageInput()
    }
}
const clearMessageInput = () => {
    const messageInput = document.getElementById('message-input');
    messageInput.value = ''
}

const renderMessage = (message, time= new Date() ,isRemoteMessage=false) => {
    const chatMessagesElement = document.getElementById('chat-messages');
    
    const li = document.createElement('li');
    li.className = 'clearfix'

    const messageMetaDataDiv = document.createElement('div');
    messageMetaDataDiv.classList = "message-data"
    
    const messageDataTimeSpan = document.createElement('span');
    messageDataTimeSpan.classList = 'message-data-time'
    messageDataTimeSpan.textContent = time

    messageMetaDataDiv.appendChild(messageDataTimeSpan)

    const messageDiv = document.createElement('div');
    messageDiv.classList = isRemoteMessage ? "message other-message float-right" : "message other-message"
    messageDiv.textContent = message


    li.appendChild(messageMetaDataDiv)
    li.appendChild(messageDiv)
    chatMessagesElement.appendChild(li)
}

const renderChatHeader = (user) => {
    const chatHeaderElement = document.getElementById('chat-header');

    const headerRowDiv = document.createElement('div');
    headerRowDiv.className = 'row';

    const headerColDiv = document.createElement('div');
    headerColDiv.className = 'col-lg-6';

    const userProfilePictureAElement = document.createElement('a');
    userProfilePictureAElement.setAttribute('data-toggle', 'modal');

    const userProfilePictureImageElement = document.createElement('img');
    userProfilePictureImageElement.src = user.profilePicture || `${AVATAR_API_URL}?name=${user.firstName}+${user.lastName}`;
    userProfilePictureImageElement.alt = 'avatar';

    const chatAboutDiv = document.createElement('div');
    chatAboutDiv.className = 'chat-about';

    const userTitleElement = document.createElement('h6');
    userTitleElement.textContent = `${user.firstName} ${user.lastName}`;

    const userEmailElement = document.createElement('small');
    userEmailElement.textContent = user.email

    userProfilePictureAElement.appendChild(userProfilePictureImageElement);
    chatAboutDiv.appendChild(userTitleElement);
    chatAboutDiv.appendChild(userEmailElement);
    headerColDiv.appendChild(userProfilePictureAElement);
    headerColDiv.appendChild(chatAboutDiv);
    headerRowDiv.appendChild(headerColDiv);

    chatHeaderElement.appendChild(headerRowDiv);
}

const getUserAvaterURL = (user) => {
    return `${AVATAR_API_URL}?name=${user.firstName}+${user.lastName}`
}


const clearChatElements = () => {
    //reset ui for active chat
    chatFrindsListElemets.forEach(element => element.classList = 'clearfix');
    //reset chat header
    const chatHeaderElement = document.getElementById('chat-header');
    chatHeaderElement.innerHTML = ''
    // reset chat messages 
    const chatMessagesElement = document.getElementById('chat-messages');
    chatMessagesElement.innerHTML = ''
}

initChat()