// Je récupère le contenu de l'url 
const queryString = window.location.search;
// Je recherche le parametre de l'url de queryString 
const urlParams = new URLSearchParams (queryString);
// Je récupère le paramètre précédé de id 
const id = urlParams.get ('id');
// Récupération des éléments nécéssaire aux fonctions
const imgContainer = document.querySelector('div.item__img');
const title = document.querySelector('h1');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const validate = document.getElementById('addToCart');
const number = document.getElementById('quantity');
// Je stock dans le localStorage l'id récupérer dans l'url 
localStorage.id = id;
// Variable nécéssaire aux fonctions 
let quantity = 0;
let color = null; 
let priceValue = 0;


// Récupération des données produits en fonction de l'id 
fetch("http://localhost:3000/api/products/"+ id)
.then(res => res.json())
.then(data => {
   showAllInfos(data);
});

// Création de l'ensemble du bloc produit 
showAllInfos = (product) => {
    const name = product.name;
    const info = product.description;
    const price = product.price;
    const colorsOption = product.colors;
    console.log(colorsOption);
    const image = product.imageUrl;
    imageInsert(image);
    titleInsert(name);
    priceInsert(price);
    infoInsert(info);
    choiceInsert(colorsOption);
    
};
// Insertion de l'image du produit 
imageInsert = (url) =>{
    const img = imgContainer.appendChild(document.createElement('img'));
    img.setAttribute('src', url);
    localStorage.image = img.getAttribute('src');
    console.log(localStorage.image);
    return img;

};
// Insertion du nom du produit 
titleInsert = (name) =>{
    localStorage.name = name;
    return title.innerHTML = name;
    
} ;   
// Insertion du prix du produit  
priceInsert = (prix) =>{
    priceValue = prix;
    return price.innerHTML = prix;
   
};
// Insertion des infos du produit 
infoInsert = (info) =>{
    return description.innerText = info;
};
// Insertion des choix de couleur en fonction du nombre de couleur par produit 
choiceInsert = (colorsOption) =>{
    console.log(colorsOption);
    colorsOption.forEach((element) =>{
        const choose = colors.appendChild(document.createElement('option'));
        choose.setAttribute('value', element)
        choose.innerText = element
        console.log(element);
    });
}

// fonction globale ajout d'élément enfant 
append = (parent, enfant)=>{
    return parent.appendChild(enfant);
 };

// Récuperation du nombre de produit commandé 
number.addEventListener('change', setNumber = () =>{
    if(number.value > 0 && number.value < 101){
        quantity = number.value;
    } else {
        alert ('Quantité non valide');
    }
    
});
// Récupération de la couleur choisie
colors.addEventListener('change', selected = () =>{
        const tmpColor = colors.selectedIndex;
        const choose = colors.options[tmpColor].value;
        console.log(choose);
        console.log(colors);
        color = choose;
        
});

// Contrôle de la quantité et couleur choisie 
validate.addEventListener('click', openCart = () =>{
    console.log(quantity + "---");
    // si quantité = 0 ou n'est pas défini 
    if (quantity == undefined || quantity <= 0){
        alert('Choisir la quantité')
        return;
    };
    if (quantity % 1 != 0){
        alert('Quantité invalide')
        return;
    }
    // si couleur n'est pas défini 
    if (color == null || color == undefined || color == ""){
        alert('Choisir une couleur')
        return;
    }
    // Création de l'objet contenant les infos du produit choisi 
       const product = {
            nom : localStorage.name,
            color : color,
            prix : priceValue,
            quantity : quantity,
            id : localStorage.id,
            img : localStorage.image,
       }
       // Création d'un tableau panier 
    let cart = [];
    // si localStorage est en JSON car il contiendrais déja un produit 

    if(localStorage.cart !== undefined){
        cart = JSON.parse(localStorage.cart);
    }


    
    const index = cart.findIndex(
        (item) => item.id === id && item.color === product.color
      );
      // si le produit avec les mêmes variantes n'existe pas dans le tableau 
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
    
// Enregistrement du tableau panier en JSON  
    localStorage.cart = JSON.stringify(cart); 
});