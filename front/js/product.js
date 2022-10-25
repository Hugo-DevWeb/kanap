const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);
const id = urlParams.get ('id');
const imgContainer = document.querySelector('div.item__img');
const title = document.querySelector('h1');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const validate = document.getElementById('addToCart');
const number = document.getElementById('quantity');
localStorage.id = id;

fetch("http://localhost:3000/api/products/"+ id)
.then(res => res.json())
.then(data => {
   showAllInfos(data);
});


showAllInfos = (product) => {
    const name = product.name;
    const info = product.description;
    const price = product.price;
    const color = product.colors;
    const image = product.imageUrl;
    imageInsert(image);
    titleInsert(name);
    priceInsert(price);
    infoInsert(info);
    choiceInsert(color);
    
};

imageInsert = (url) =>{
    const img = imgContainer.appendChild(document.createElement('img'));
    img.setAttribute('src', url);
    localStorage.image = img.getAttribute('src');
    console.log(localStorage.image);
    return img;

};
titleInsert = (name) =>{
    localStorage.name = name;
    return title.innerHTML = name;
    
} ;    
priceInsert = (prix) =>{
    localStorage.prix = prix;
    return price.innerHTML = prix;
   
};
infoInsert = (info) =>{
    return description.innerText = info;
};
choiceInsert = (tab) =>{
    tab.forEach((element, index) =>{
        const choose = colors.appendChild(document.createElement('option'));
        choose.setAttribute('value', tab[index].text)
        choose.innerText = tab[index]
        console.log(tab[index]);
    });
}


append = (parent, enfant)=>{
    return parent.appendChild(enfant);
 };


number.addEventListener('change', setNumber = () =>{
    const quantity = number.value;
    localStorage.quantity = quantity;
    
});
colors.addEventListener('change', selected = () =>{
    const color = colors.selectedIndex;
    const choose = colors.options[color].text;
    localStorage.color = choose;
    
});


console.log(localStorage);

validate.addEventListener('click', openCart = () =>{
    
    const product = {
        nom : localStorage.name,
        color : localStorage.color,
        prix : localStorage.prix,
        quantity : localStorage.quantity,
        id : localStorage.id,
        img : localStorage.image,
    }

    let cart = [];

    if(localStorage.cart !== undefined){
        cart = JSON.parse(localStorage.cart);
    }


    
    const index = cart.findIndex(
        (item) => item.id === id && item.color === product.color
      );
      if( index === -1 ){
        cart.push(product);
        // il push
      } else {
           for (let content of cart){
            if (content.name === product.name && content.color === product.color){
                let contentQuantity = parseInt(content.quantity);
                let productQuantity = parseInt(product.quantity);
                let result = contentQuantity + productQuantity;
                content.quantity = result;
            }
           }
        }
        // on incremente la quantité sans push 
    

    localStorage.cart = JSON.stringify(cart); 
    console.log(JSON.parse(localStorage.cart));
});