const handleSignUp = () => {
    event.preventDefault();
    
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
        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleErrorMessage(error.responseJSON.message);
        }
    });
}


const handleLogin = () => {
    const email = $("#email-login").val();
    const password = $("#password-login").val();
    
    event.preventDefault();
    
    $.ajax({
        url: "/login",
        method: "POST",
        data: { email, password },    
        success: function (data) {
            console.log(data)
            window.location.href = "/posts";

        },
        error: function (error) {
            console.log(error.responseJSON.message);
            handleErrorMessage(error.responseJSON.message);
        }
      });
    
}

const handleErrorMessage = (errorContent) => {
    $("#alert-container").html(`
    <div class="alert alert-danger alert-dismissible fade show">
        <strong>${errorContent}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
`);
}

const cleanAlerts = () => {
    $("#alert-container").html('');
}