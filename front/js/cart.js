

// Je récupère le tableau de panier en objet JS
const cartBloc = JSON.parse(localStorage.cart);


// Fonction d'ajout d'éléments enfants
append = (parent, enfant) => {
     return parent.appendChild(enfant);
};



// Je récupère le container du cart
const cartItems= document.getElementById('cart__items');
// Je crée l'article container d'élément et lui donne les attribut nécéssaires
createCart = (element) => {
    const cart = document.createElement('article');
    cart.classList.add('cart__item');
    cart.setAttribute('data-id', element.id);
    cart.setAttribute('data-color', element.color);
    append(cartItems, cart);
    // append(cart, imgBloc);
    // append(cart, itemBloc);


};
// je crée un tableau des articles present 
const tabArticles = document.getElementsByTagName('article');
let nbArticle = tabArticles.length;


// Création du bloc img et content 
createBloc = (title, index) => {
    const bloc = document.createElement('div');
    bloc.classList.add('cart__item__' + title);
    const cart = document.getElementsByClassName('cart__item');   
    cart[index].append(bloc);
    // append(cart[index], bloc);
}



// Insertion de l'image dans le bloc correspondant 
insertImg = (url, index) => {
    let img = document.createElement('img');
    let imgBloc = document.getElementsByClassName('cart__item__img');
    
    imgBloc[index].append(img);
    img.setAttribute('src', url);
}




/// création des sous bloc content description et settings 
createSubBloc = (title, index) => {
    const bloc = document.createElement('div');
    const contentBloc = document.getElementsByClassName('cart__item__content');
 
    contentBloc[index].append(bloc);
    bloc.classList.add('cart__item__content__' + title);
    
}


// création du bloc description et ajout du prix total dans le tableau totalPrice 
createDescriptionBloc = (name, color, price, quantity,  index) => {
    const descriptionBloc = document.getElementsByClassName('cart__item__content__description')
    let title = document.createElement('h2');
    let content = document.createElement('p');
    let content2 = document.createElement('p');
    descriptionBloc[index].append(title, content, content2);
    title.innerHTML = name;
    content.innerHTML = color;
    content2.innerHTML = price + "€";
    let calculPrice = price * quantity;
    totalPrice.push(calculPrice);
};
// Création des dernier bloc de panier quantity et settings
createSettingsBloc= (title, index) => {
    let bloc = document.createElement('div');
    bloc.classList.add('cart__item__content__settings__' + title);
    const settingsBloc = document.getElementsByClassName('cart__item__content__settings');
    settingsBloc[index].append(bloc);
}

// Création du bloc de quantity
createQuantityBloc = (quantity, index) => {
    const quantityBloc = document.getElementsByClassName('cart__item__content__settings__quantity');
    let para = document.createElement('p');
    para.innerHTML = "Qté :";
    let nbProduit = document.createElement("input");
    nbProduit.setAttribute('type', 'number');
    nbProduit.setAttribute('name', 'itemQuantity');
    nbProduit.setAttribute('min', 0);
    nbProduit.setAttribute('max', 100);
    nbProduit.setAttribute('value', quantity);
    totalQuantity.push(quantity);
    nbProduit.classList.add('itemQuantity');
    quantityBloc[index].append(para);
    quantityBloc[index].append(nbProduit);
    
}
//Création du bloc delete avec attribut de l'article 
createDeleteBloc = (name, color,  index) => {
    const deleteBloc = document.getElementsByClassName('cart__item__content__settings__delete');
    let para = document.createElement('p');
    para.innerText = "Supprimer";
    para.classList.add('deleteItem');
    deleteBloc[index].append(para);
}

// tableau du prix total
let totalQuantity = [];
let totalPrice = [];

let quantitySum = 0;


// Calcul du prix total 
showTotalPrice = () =>{
    let sum = 0;
    let totalPriceBloc = document.getElementById('totalPrice');
    for (let i = 0; i < totalPrice.length; i++) {
    sum += totalPrice[i];
};
    totalPriceBloc.innerHTML= sum;
}
// Calcul quantité total
showTotalQuantity = () => {
    let totalQuantityBloc = document.getElementById('totalQuantity');
    for (let i = 0; i < totalQuantity.length; i++){
        quantitySum += parseInt(totalQuantity[i]);
    }
    totalQuantityBloc.innerHTML = quantitySum;

};






// Pour chaque element du tableau on appelle ces fonctions 
cartBloc.forEach((element, index) => {
    
        const url = element.img;
        createCart(element);
        createBloc('img', index);
        createBloc('content', index);
        insertImg(url, index);
        createSubBloc('description', index);
        createSubBloc('settings', index);
        createDescriptionBloc(element.nom, element.color, element.prix, element.quantity, index);
        createSettingsBloc('quantity', index);
        createSettingsBloc('delete', index);
        createQuantityBloc(element.quantity, index);
        createDeleteBloc(element.id,element.color, index);
        
        
    });
// Affiche le prix total et la quantité
showTotalPrice();
showTotalQuantity();


 const deleteItems = document.getElementsByClassName('deleteItem');
const articleList = document.getElementsByClassName('cart__item');

// Si quantité modifié modification ajouté a la page et au localStorage
changeQuantity = () => {
    const selectorQuantity = document.querySelectorAll('.itemQuantity');
    for (let quantity of selectorQuantity){
        quantity.addEventListener('change', function(){
            let value = quantity.value;
            let parent = quantity.closest('article').getAttribute('data-id');

            for (let bloc of cartBloc){
                if(bloc.id == parent){
                    
                    bloc.quantity = value;
                    localStorage.cart = JSON.stringify(cartBloc);
                    location.reload();
                }
            }
        });
    };
}


changeQuantity();
// Si produit supprimé suppression effectué sur la page et dans le localStorage 
deleteButton = () => {
   const deleteButtons = document.querySelectorAll('.deleteItem');
   for (let deleteButton of deleteButtons){
    deleteButton.addEventListener('click', function(){
        const articleInCart = deleteButton.closest('article');
        articleInCart.remove();
        console.log(articleInCart);

        for (let i = 0; i<cartBloc.length; i++){
            const bloc = cartBloc[i];
            if (bloc.id == articleInCart.getAttribute('data-id') && bloc.color == articleInCart.getAttribute('data-color')){
                 console.log(bloc);
                 cartBloc.splice(i, 1);
                 localStorage.setItem('cart', JSON.stringify(cartBloc));
                 location.reload();
            }
        }
    });
  }
}

deleteButton();

// récuperation des éléments de formulaire
const firstName = document.getElementById('firstName');
const firstNameError = document.getElementById ('firstNameErrorMsg');
const lastName = document.getElementById('lastName');
const lastNameError = document.getElementById ('lastNameErrorMsg');
const address = document.getElementById('address');
const addressError = document.getElementById('addressErrorMsg');
const city = document.getElementById('city');
const cityError = document.getElementById('cityErrorMsg');
const mail = document.getElementById('email');
const mailError = document.getElementById('emailErrorMsg');
const validOrder = document.getElementById('order');
const form = document.querySelector('form');
// Création des différentes reggex 
let nameReggex = /^[a-z ,.'-]+$/i;
let addressReggex = /^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$/
let emailReggex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Contrôle de la valeur des input et implémantation message d'erreur 
controlInput = (input, reggex, error) =>{
    input.addEventListener('change', function(){
        if(reggex.test(this.value)){
            error.innerText= "";
            return true;
        } else {
            error.innerText = "Champ invalide" 
            return false;
        }
       
    })
}
controlInput(form.firstName, nameReggex, firstNameError);
controlInput(form.lastName, nameReggex, lastNameError);
controlInput(form.address, addressReggex, addressError);
controlInput(form.city, nameReggex, cityError);
controlInput(form.email, emailReggex, mailError);

// Validation de commande et envoi de l'objet Customer via l'api, ouverture de la page confirmation 
validOrder.addEventListener('click', function(e){
    e.preventDefault();
    if(controlInput(form.firstName, nameReggex, firstNameError) ||
       controlInput(form.lastName, nameReggex, lastNameError) ||
       controlInput(form.address, addressReggex, addressError) ||
       controlInput(form.city, nameReggex, cityError) ||
       controlInput(form.email, emailReggex, mailError) == false){
        console.log("error");
    } else { 
        let products = [];
        for(item of cartBloc){
            products.push(item.id);
            console.log(products);
        } 
        const Customer = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value,
            },
            products: products,
        }
        console.log(Customer);
        if( products.length == 0){
            let productError = alert ('Votre panier est vide !');
            return productError; 
        }
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            body: JSON.stringify(Customer),
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(res => {
                document.location.href = "confirmation.html?orderId=" + res.orderId;
            })

    };
        
})

