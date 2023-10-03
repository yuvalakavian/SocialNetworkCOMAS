// Function to display image preview
document.getElementById('imageUpload').addEventListener('change', function () {
    const imagePreview = document.getElementById('imagePreview');
    const fileInput = this;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'img-fluid';
            img.style.maxHeight = '200px'; // Adjust the max height as needed
            imagePreview.innerHTML = '';
            imagePreview.appendChild(img);
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
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
        type: 'DELETE',
        success: function (data) {
            console.log(data);
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
        comment: $("#commentText_"+id).val(),
    };
    
    $.ajax({
        url: "/posts/comment",
        method: "POST",
        data: data,
        success: function(data) {
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
    comment_section_id = "commentsSection_"+id
    $("#"+comment_section_id).toggle(); // Show/hide the comments section
};
