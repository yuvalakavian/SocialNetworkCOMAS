const handleSignUp = () => {
    const signUpData = {
        email: $("#email-signup").val(),
        firstName: $("#firstName").val(),
        lastName: $("#lastName").val(),
        country: $("#country").val(),
        city: $("#city").val(),
        streetAddress: $("#street-address").val(),
        password: $("#password-signup").val()
    };
    
    $.ajax({
        url: "/signup",
        method: "POST",
        data: signUpData,
        success: function(data) {
            console.log(data)
        }
    });
}


const handleLogin = () => {
    const email = $("#email-login").val();
    const password = $("#password-login").val();

    $.ajax({
        url: "/login",
        method: "POST",
        data: { email, password },    
        success: function (data) {
            console.log(data)
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleIncorrectCreds(error.responseJSON.message);
        }
      });
    
}

const handleIncorrectCreds = (errorContent) => {
    console.log(errorContent)
    let container = document.getElementById("alert-container");
    container.innerHTML = `<div class="alert alert-success alert-dismissible fade show">
        <strong>${errorContent}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;
}