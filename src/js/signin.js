
document.getElementById("continueBtn").addEventListener("click",ContinueClick);
document.querySelector("form").addEventListener("submit",FormSubmit);



function ContinueClick(){
    event.preventDefault();
    document.querySelector("form").style.width = "500px";
    fetch("https://shopper-backend-fdhf.onrender.com/users")
    .then(response=>{
        return response.json()
    })
    .then((users)=>{
        users.map(user=>{
            // alert("hi")
    var txtEmail = document.getElementById("txtEmail");

    if(txtEmail.value==user.Email || txtEmail.value==user.Mobile){
         document.getElementById("passwordContainer").className = "d-block";
        document.getElementById("error").style.display = "none";
         document.getElementById("continueContainer").style.display = "none"
        // document.querySelector("form").className = "border p-3 rounded-4 w-25 bg-secondary text-bg-dark h-75 m-4";
        document.querySelector("form").style.width = "300px"
    }
    else{
        document.querySelector("form").style.width = "300px"
        document.getElementById("error").innerHTML = "Invalid Email or Mobile".fontcolor('red');
    }
        })
    })
}

function FormSubmit(){
    event.preventDefault();
    fetch("https://shopper-backend-fdhf.onrender.com/users")
    .then(response=>{
        return response.json()
    })
    .then(users=>{
        users.map(user=>{



    //         var txtEmail = document.getElementById("txtEmail");

    // if(txtEmail.value==user.Email || txtEmail.value==user.Mobile){
    //     // document.getElementById("passwordContainer").className = "d-block";
    //     document.getElementById("error").style.display = "none";
    //     // document.getElementById("continueContainer").style.display = "none"
    //     // document.querySelector("form").className = "border p-3 rounded-4 w-25 bg-secondary text-bg-dark h-75 m-4";
    // }
    // else{
    //     document.getElementById("error").innerHTML = "Invalid Email or Mobile".fontcolor('red');
    // }


            var txtPassword = document.getElementById("txtPassword");
            document.getElementById("error").style.display = "none";

            if(txtPassword.value==user.Password){
                alert("login Successfull");
                console.log(user.UserName)
                localStorage.setItem("user",user.UserName);
                location.href = "index.html"
            }
            else if(txtPassword.value!=user.Password){
                document.getElementById("errorPassword").innerHTML = "Invalid Password".fontcolor('red');
            }else{
                document.getElementById("errorPassword").innerHTML = "";   
            }
        })
    })    
}