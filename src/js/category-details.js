var product = JSON.parse(localStorage.getItem("id"));

var categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];

if(localStorage.getItem("user")){
    document.getElementById("userSignin").style.display = "none";
    document.getElementById("userSignout").className = "d-block";
    document.getElementById("userSignout").addEventListener("click",UserSignoutClick)
}

function UserSignoutClick(){
    alert("Are You Sure\n Want To SignOut?")
    localStorage.removeItem("user");
    document.getElementById("userSignin").style.display = "block";
    document.getElementById("userSignout").className = "d-none";
    
}



document.getElementById("mensWear").addEventListener("click",MensClick);
function MensClick(){
    localStorage.setItem("category",JSON.stringify("mens"));
    location.href = "categories.html"
}
document.getElementById("womensWear").addEventListener("click",WomensClick);
function WomensClick(){
    localStorage.setItem("category",JSON.stringify("womens"));
    location.href = "categories.html"
}
document.getElementById("kidsWear").addEventListener("click",KidsClick);
function KidsClick(){
    localStorage.setItem("category",JSON.stringify("kids"));
    location.href = "categories.html"
}



DisplayImage();
GetCartCount();
function DisplayImage(){
    console.log(product);
    var div = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    var div4 = document.createElement("div");
    var div5 = document.createElement("div");
    var ul = document.createElement("ul");
    //var div6 = document.createElement("div");


    div1.className = "mb-4"
    div2.className = "mb-4"
    div3.className = "mb-4"
    div4.className = "mb-4"

    div1.innerHTML = `<img onmouseover="handleMouseOverImage(this)" id="img1" src=${product.image1} height="50" width="50">`
    div2.innerHTML = `<img onmouseover="handleMouseOverImage(this)" id="img2" src=${product.image2} height="50" width="50">`
    div3.innerHTML = `<img onmouseover="handleMouseOverImage(this)" id="img3" src=${product.image3} height="50" width="50">`
    div4.innerHTML = `<img onmouseover="handleMouseOverImage(this)" id="img4" src=${product.image4} height="50" width="50">`

    div5.innerHTML = `<img src=${product.image1} id="img5" height="400" width="350">`

    var category = {
    id: product.id, 
    name: product.name,
    image: product.image1,
    price: product.price,
    details: product.details
    }
    
    categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];
    categoryLst.push(category);

    ul.setAttribute("id","title")
    ul.innerHTML = `
    <li><h2>${product.name}</h2></li>
    <li>${product.details}</li>
    <li>&#8377; ${product.price}</li>
    <li><button id="addToCartBtn" class="btn btn-outline-dark ">Add To Cart Click</button></li>
    `
    //div6.innerHTML = `<button id="addToCartBtn"  class="btn btn-outline-light text-bg-dark">Add To Cart Click</button>`
   

   document.addEventListener("DOMContentLoaded",()=>{
        //alert("hi")
        var addToCartBtn = document.getElementById("addToCartBtn");
        addToCartBtn.addEventListener("click",()=>{
        categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];
        categoryLst.push(category);
        alert(`Added To Cart \n ${category.details}`);
        localStorage.setItem("categorylist",JSON.stringify(categoryLst));
        GetCartCount();

        });
    })

    div.append(div1,div2,div3,div4);
    //console.log(div)

    document.querySelector("#imgContainer").appendChild(div);
    document.querySelector("main").appendChild(div5);
    document.getElementById("details").append(ul)
}


function handleMouseOverImage(obj){
    var img = document.getElementById("img5");
    img.src = obj.src;
   
}

var categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];
GetCartCount();

function GetCartCount(){
    var cart = document.getElementById("cartCount");
    cart.innerHTML = categoryLst.length;
};

//LoadCartClick()
var total;
function LoadCartClick(){
    document.querySelector("tbody").innerHTML="";
    categoryLst.map((category,index)=>{
        var tbody = document.querySelector("tbody");
        var trBody = document.createElement("tr");
        var tdTitle = document.createElement("td");
        var tdPrice = document.createElement("td");
        var tdImage = document.createElement("td");
        var tdRemove = document.createElement("td");
        

        tdTitle.innerHTML = category.details;
        tdPrice.innerHTML = `&#8377; ${category.price}`;
        tdImage.innerHTML = `<img src="${category.image}" height="150" width="150">`;
        tdRemove.innerHTML = "<button class='text-danger border-0'><span class='bi bi-trash-fill'></span></button>";
         total =  categoryLst.reduce((acc,elem)=>{
        
            return acc+elem.price;
        },0);

        tdRemove.className = "text-danger fs-1 ";
        console.log(tdRemove.childNodes[0]);
            tdRemove.childNodes[0].addEventListener("click",()=>{
                RemoveClick(index)
            })

        trBody.append(tdTitle,tdPrice,tdImage,tdRemove);
       
        tbody.appendChild(trBody,);
    })
    console.log(total)

    var tfoot = document.querySelector("tfoot")
    var trFooter = document.getElementById("trfoot");
    var tdTotal = document.getElementById("tdtotal");

   if(categoryLst.length==0){
    total = 0;
    tdTotal.innerHTML = `<h4>&#8377; ${total}</h4>`
   }
    tdTotal.innerHTML = `<h4>&#8377; ${total}</h4>`

    trFooter.append(tdTotal);

    tfoot.appendChild(trFooter);

};

function RemoveClick(i){
    
    categoryLst.splice(i,1);
    localStorage.setItem("categorylist",JSON.stringify(categoryLst));
    LoadCartClick();
    GetCartCount();
}


