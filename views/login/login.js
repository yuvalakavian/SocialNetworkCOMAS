
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
        followRedirects: true,
        // xhrFields: { withCredentials: true },
        // success: function (data, textStatus, jqXHR) {
        //   if (jqXHR.status == 200) {
        //     const path = window.location.search.split("=")[1]
        //     window.location.href = path;
        //   } else {
        //   }
        // },
        // error: function (error) {
        //   renderError(error.responseJSON);
        // },
      });
    
}