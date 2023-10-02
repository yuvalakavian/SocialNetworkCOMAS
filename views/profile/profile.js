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
            // $("#uploadStatus").html('File uploaded successfully!');
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
            // uploadHandler( stringToBytes(fileContent), file.type);
            uploadHandler( fileContent, file.type);
        }
        readFile.readAsDataURL(file);
    });
});

