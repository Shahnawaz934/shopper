document.querySelector("form").addEventListener("submit",FormSubmit);
document.getElementById("txtName").addEventListener("keyup",VerifyUserName);
document.getElementById("txtMobile").addEventListener("keyup",VerifyMobile);
document.getElementById("txtPassword").addEventListener("keyup",VerifyPassword);
document.getElementById("txtRePassword").addEventListener("keyup",VerifyBothPassword);

function FormSubmit(){
    event.preventDefault();
    var data = {
        UserName: document.getElementById("txtName").value,
        Email: document.getElementById("txtEmail").value,
        Mobile: document.getElementById("txtMobile").value,
        Password : document.getElementById("txtPassword").value
    }
   fetch(
          "https://shopper-backend-fdhf.onrender.com/registeruser",
        { method: "POST",
         body: JSON.stringify(data),
         headers:{
        'content-type': 'application/json; charset=UTF-8',
      },
    })
     .then(response=>{
        return response.json();
    })
    .then(users=>{
        alert(`${data.UserName} \nSignup Successfully`);
        location.href = "signin.html"
    })

}
function VerifyUserName(){
    var txtName = document.getElementById("txtName").value;
    if(txtName.charCodeAt(0)>=65 && txtName.charCodeAt(0)<=90){
        document.getElementById("userError").innerHTML = "";
        if(txtName.length<4){
        document.getElementById("userError").innerHTML = "Name too short min 4 char's required".fontcolor('red');
        }else{
            document.getElementById("userError").innerHTML = "";
        }
    }
    else{
        document.getElementById("userError").innerHTML = "Name must start with uppercase only".fontcolor('red');
    }
    // else{
    //     document.getElementById("txtName").innerHTML = ""
    // }
}

function VerifyMobile(){
    var txtMobile = document.getElementById("txtMobile").value;
    var regExp = /\+91\d{10}/;
    if(txtMobile.match(regExp)){
        document.getElementById("mobileError").innerHTML = ""
    }
    else{
        document.getElementById("mobileError").innerHTML = `Invalid Mobile : <b>${document.getElementById("txtMobile").placeholder}</b>`.fontcolor('red');
    }
    
}

function VerifyPassword(){
    var txtPassword = document.getElementById("txtPassword").value;

    var regExp = /(?=.*[!@#$%^&])(?=.*[A-Z])(?=.*[0-9])/;
    if(txtPassword.match(regExp)){
        document.getElementById("passwordError").innerHTML = "";
    }
    else{
        document.getElementById("passwordError").innerHTML = "Use atleast one chars from all (0-9),(A-Z),(!@#$%^&)".fontcolor('red');
    }
}

function VerifyBothPassword(){
    var txtRePassword = document.getElementById("txtRePassword").value;
    var txtPassword = document.getElementById("txtPassword").value;
    if(txtRePassword===txtPassword){
        document.getElementById("rePasswordError").innerHTML = "";
    }else{
        document.getElementById("rePasswordError").innerHTML = "Enter correct password".fontcolor('red');
    }
}
