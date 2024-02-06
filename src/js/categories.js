 var categoryName = JSON.parse(localStorage.getItem("category")) || "";

 LoadCategories();



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


//CategoryClick("http://127.0.0.1:4400/produts");
// if(categoryName = "http://127.0.0.1:4400/products"){
//     CategoryClick("http://127.0.0.1:4400/products");
// }

if(categoryName!="http:127.0.0.1:4400/products"){
    CategoryClick(`http://127.0.0.1:4400/products/${categoryName}`);
}
function bodyload(){
    categoryName = JSON.parse(localStorage.getItem("category"));
    if(categoryName=="http://127.0.0.1:4400/products"){
        CategoryClick(categoryName)
    }
    //else{
    //     CategoryClick(`http://127.0.0.1:4400/products/${categoryName}`)
    // }
    GetCartCount(); 
}


var categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];
GetCartCount();

function CategorySort(products){
    document.querySelector("main").innerHTML = ""
    products.map(product=>{
        Card(product);
        //console.log(product);
        
    })
}

function CategoryClick(url){
    //document.querySelector("main").innerHTML = ""
    if(url.startsWith("http://127.0.0.1:4400")){
        fetch(url)
        .then(response=>{
            return response.json()
        })
        .then((products)=>{
            products.map((product)=>{
                
                Card(product);
            })
        })
            
        }
}

function Card(product){
    
    var card = document.createElement("div");
    var img = document.createElement("img");
    var title = document.createElement("h6");
    var footer = document.createElement("div");
    var price = document.createElement("h5");
    var cartbtn = document.createElement("button");
    cartbtn.setAttribute("id","addToCartBtn");

    img.src = product.image1;
    img.alt = product.name;
    title.innerHTML = product.details;
    title.setAttribute("id","title");
    price.innerHTML = ` &#8377; ${product.price}`;
    cartbtn.innerHTML = "Buy Now";
    footer.addEventListener("click",()=>{
    localStorage.setItem("id",JSON.stringify(product));
    location.href = "category-details.html"
    })

    var category = {
    id: product.id, 
    name: product.name,
    image: product.image1,
    price: product.price,
    details: product.details
    }

    cartbtn.addEventListener("click",()=>{
    categoryLst = JSON.parse(localStorage.getItem("categorylist"))||[];
    categoryLst.push(category);
    alert(`Added To Cart \n ${category.details}`);
    localStorage.setItem("categorylist",JSON.stringify(categoryLst));
    GetCartCount();

    })

    footer.append(img,title,price);
    card.append(footer,cartbtn);
    document.querySelector("main").appendChild(card);

}  

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
        tdImage.innerHTML = `<img src="${category.image}" id="cartImg"  width="100">`;
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

// document.addEventListener("DOMContentLoaded",()=>{
//     GetCartCount();
// })

function GetCartCount(){
    var cartCount = document.getElementById("cartCount");
    
    cartCount.innerHTML = categoryLst.length;
}   



function LoadCategories(){
    fetch("http://127.0.0.1:4400/products/categories")
    .then(response=>{
        return response.json()
    })
    .then(categories=>{
        categories.unshift({"category": "all"})
        categories.map(item=>{
            var option = document.createElement("option");
            option.innerHTML = item.category.toUpperCase();
            option.value = item.category;
            //console.log(option.value);
            document.getElementById("lstCategories").appendChild(option);
        })
    })
};



function handleCategoryChange(){
    document.querySelector("main").innerHTML = ""
    var categoryName = document.querySelector("select").value;
    //console.log(categoryName);
    if(categoryName=="all"){
        
         localStorage.setItem("category",JSON.stringify("http://127.0.0.1:4400/products"))
         CategoryClick("http://127.0.0.1:4400/products")
    }
    else{
        localStorage.setItem("category",JSON.stringify(categoryName));
        var category = JSON.parse(localStorage.getItem("category"));
        CategoryClick(`http://127.0.0.1:4400/products/${category}`)
    }
}

function handleFilterByCategoryClick(){
    document.querySelector("main").innerHTML = "";
    var categories = document.getElementsByName("categories");
    for(var item of categories){
        if(item.checked){
            console.log(item.value);
            localStorage.setItem("category",JSON.stringify(item.value));
            var category = JSON.parse(localStorage.getItem("category"));
            CategoryClick(`http://127.0.0.1:4400/products/${category}`);
        }
    }
}

function handlePriceChange(){
    categoryName = JSON.parse(localStorage.getItem("category"));
    
    if(categoryName =="http://127.0.0.1:4400/products"){
        fetch("http://127.0.0.1:4400/products")
        .then(response=>{
            return response.json();
        })
        .then(products=>{
            //alert("hi")
            SelectCategoryForSorting(products);
        })
    }
    else{
        fetch(`http://127.0.0.1:4400/products/${categoryName}`)
        .then(response=>{
            return response.json();
        })
        .then(products=>{
            //alert("hi")
            SelectCategoryForSorting(products);
        })
    }



    
}

function SelectCategoryForSorting(products){
    var selectSort = document.getElementById("sortPrice").value;
        if(selectSort=="high"){
            products.sort((a,b)=>{
                if(a.price>b.price){
                    return -1
                }
                if(a.price<b.price){
                    return 1
                }
                return 0
            })
        }
        if(selectSort=="low"){
            products.sort((a,b)=>{
                if(a.price>b.price){
                    return 1
                }
                if(a.price<b.price){
                    return -1
                }
                return 0
            });
        };
        
        
         CategorySort(products);
         //console.log(products);
}