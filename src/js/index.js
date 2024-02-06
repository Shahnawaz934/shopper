LoadMensCategories();
LoadWomensCategories();
// function bodyload(){
//     LoadMensCategories();
//     LoadWomensCategories();
// }

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

function handleProductsClick(){
    localStorage.setItem("category",JSON.stringify("womens"));
    // localStorage.setItem("category",JSON.stringify("http://127.0.0.1:4400/products"))
    location.href = "categories.html";    
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


function LoadMensCategories(){
    fetch("http://127.0.0.1:4400/productsSample")
    .then(response=>{
        return response.json()
    })
    .then(products=>{
        var items = products.filter(item=>{
            return item.category=="mens"
        })
        .map((product,i)=>{
            document.getElementById("sample1").className = "d-flex flex-wrap justify-content-center mt-4 p-4 ";
       
            var div1 = document.createElement("div");
            var img1 = document.createElement("img");
            img1.src=product.image;
            div1.style.position = "relative"
            
            img1.setAttribute("class","img2");

            if(product.category=="mens" && i==1){
                img1.setAttribute("id","img3")
            }

            var categoryName= product.category;
           
            var btn = document.createElement("button");
            btn.innerHTML = `Shop now <span class="bi bi-arrow-right"></span>`;
            btn.setAttribute("id","btn");
            btn.addEventListener("click",()=>{
                localStorage.setItem("category",JSON.stringify(categoryName));
                location.href = "categories.html"
            })

            div1.append(img1,btn);
            //console.log(div1);

            
            document.getElementById("sample1").appendChild(div1);
            
        })
    })
}




function LoadWomensCategories(){
    fetch("http://127.0.0.1:4400/productsSample")
    .then(response=>{
        return response.json()
    })
    .then(products=>{
        var items = products.filter(item=>{
            return item.category=="womens"
        })
        .map((product,i)=>{
            document.getElementById("sample2").className = "d-flex flex-wrap justify-content-center  p-4 "
       
            var div1 = document.createElement("div");
            var img1 = document.createElement("img");
            img1.src=product.image;
            div1.style.position = "relative"

            
            img1.setAttribute("class","img4");

            if(product.category=="womens" && i==1){
                img1.setAttribute("id","img5")
            }
            var categoryName=product.category;
            //console.log(categoryName)
           
            var btn = document.createElement("button");                                         
            btn.innerHTML = `Shop now <span class="bi bi-arrow-right"></span>`;
            btn.setAttribute("id","btn");
            btn.addEventListener("click",()=>{
                localStorage.setItem("category",JSON.stringify(categoryName));
                location.href = "categories.html"
            })

            
            div1.append(img1,btn);
           // console.log(div1);
            document.getElementById("sample2").appendChild(div1);
            
        })
    })
}




function LoadCategories(url){
    fetch(url)
    .then((response)=>{
        return response.json();
    })
    .then((products)=>{
        var items = products.filter((item,index)=>{
            return index>=0 && index<=5
        })
        .map(product=>{
            if(product.category=="mens"){
                document.getElementById("productBox1").className = "d-flex flex-wrap p-4 justify-content-center me-2 ms-2 mt-4";
            }
            if(product.category=="womens"){
                document.getElementById("productBox2").className = "d-flex flex-wrap p-4 justify-content-center me-2 ms-2 mt-4";
            }

            if(product.category=="kids"){
                document.getElementById("kids-container").className = "d-flex flex-wrap justify-content-center me-2 ms-2 mt-4";
                
            }
            
            
            var div1 = document.createElement("div");
            if(product.category=="kids"){
                div1.setAttribute("class","kidsFashion");
            }else{
            div1.setAttribute("class","fashion");
            }
            var div2 = document.createElement("div");
            div2.setAttribute("class","pics");

            var span1 = document.createElement("span");
            var span2 = document.createElement("span");
            var img1 = document.createElement("img");
            var para1 = document.createElement("p");
            var para2 =document.createElement("p")
            if(product.category=="kids"){
                img1.setAttribute("class","kidsImg");
            }else{
            img1.setAttribute("class","Img1");
            }
            var img2 = document.createElement("img");
            if(product.category=="kids"){
                img2.setAttribute("class","kidsImg");
            }else{
            img2.setAttribute("class","Img1");
            }

            var div3 = document.createElement("div")
            var categoryName = product.category 
            //console.log(categoryName);

            div1.addEventListener("click",()=>{
                localStorage.setItem("category",JSON.stringify(categoryName));
                location.href = "categories.html";
            })

            para1.innerHTML =  product.name;
            para1.className = "text-center";
            para2.innerHTML = `&#8377; ${product.price}`;
            para2.className = "text-center";
            para1.setAttribute("id", "paragraph1");
            para2.setAttribute("id", "paragraph2")

            img1.src = product.image1;
            img2.src = product.image2;
            span1.append(img1)
            span2.append(img2)
            div2.append(span1,span2);
           // console.log(div2)
          
            div1.append(div2);
            div3.append(div1,para1,para2)
            if(product.category=="mens"){
                document.getElementById("productBox1").appendChild(div3);
            }
            if(product.category=="womens"){
                document.getElementById("productBox2").appendChild(div3);
            }
            if(product.category=="kids"){
                document.getElementById("kids-container").appendChild(div3);
                //console.log(document.getElementById("kids-container"))
            }
          
        })
    })
};




LoadCategories("http://127.0.0.1:4400/products/mens");

LoadCategories("http://127.0.0.1:4400/products/womens");
LoadCategories("http://127.0.0.1:4400/products/kids");

