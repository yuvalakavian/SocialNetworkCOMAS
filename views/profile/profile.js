const stringToBase64 = (string) => {
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(string);
    const base64String = btoa(String.fromCharCode.apply(null, byteArray));
    return base64String;
}

const uploadHandler = (fileContent, fileType) => {
    console.log(fileContent.length)
    const fileData = {
        size: fileContent.length,
        type: fileType,
        content: fileContent
    };
    $.ajax({
        url: '/profile/upload-profile-picture',
        type: 'POST',
        data: fileData,
        success: function(data) {
            console.log(data);
            location.reload();
        },
        error: function(error) {
            $("#uploadStatus").html('Error uploading file.');
            console.error(error);
        }
    });
}

$(document).ready(function() {
    $("#uploadButton").click(function() {
        $("#fileInput").toggle();

        if ($("#fileInput").is(":visible")) {
        
            $("#uploadButton").text("Upload");
        } else {
            $("#uploadButton").text("Change Profile Picture");
        }
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];

        readFile = new FileReader();
        readFile.onload = function(event) {
            var fileContent = event.target.result;
            uploadHandler( fileContent, file.type);
        }
        readFile.readAsDataURL(file);
    });
    
    $('#confirmDeleteProfileBtn').click(function() {
        $.ajax({
            url: '/profile/deleteProfile',
            type: 'DELETE',
            success: function(data) {
                console.log(data);
                window.location.href = "/logout";
            },
            error: function(error) {
                console.error(error);
            }
        });
    });

    
});


const handlePosting = () => {
    event.preventDefault();

    const contentData = {
        content: $("#postContent").val(),
    };

    $.ajax({
        url: "/posts/post",
        method: "POST",
        data: contentData,
        success: function (data) {
            console.log(data)
            location.reload(true);
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleErrorMessage(error.responseJSON.message);
        }
    });
}

const handleIncreaseLike = (id) => {
    event.preventDefault();

    const contentData = {
        id: id,
    };

    $.ajax({
        url: "/posts/like",
        method: "POST",
        data: contentData,
        success: function (data) {
            console.log(data)
            location.reload(true);
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleErrorMessage(error.responseJSON.message);
        }
    });
}

const handleDeletePost = (id) => {
    event.preventDefault();

    const data = {
        id: id,
    };

    $.ajax({
        url: '/posts/deletePost',
        data: data,
        type: 'DELETE',
        success: function (data) {
            console.log(data);
            location.reload(true);
        },
        error: function (error) {
            console.error(error);
        }
    });
}
const handleComment = (id) => {
    event.preventDefault();

    const data = {
        id: id,
        comment: $("#commentText_" + id).val(),
    };

    $.ajax({
        url: "/posts/comment",
        method: "POST",
        data: data,
        success: function (data) {
            console.log(data)
            location.reload(true);
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleErrorMessage(error.responseJSON.message);
        }
    });
}

const toggleCommentSection = (id) => {
    comment_section_id = "commentsSection_" + id
    $("#" + comment_section_id).toggle(); // Show/hide the comments section
};
