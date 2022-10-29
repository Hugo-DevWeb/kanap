// Récuperation du bloc parent des produits 
const container = document.getElementById('items');
// Récuperation des produits via l'api
fetch("http://localhost:3000/api/products/")
   .then(res => res.json())
   .then(data => {
      console.log(data)
      getAllProducts(data);
   });
   

// Récuperation et affichage du produit | construction du bloc de chaque produit 
const getAllProducts = (products) => {
   for (let i=0; i < products.length; i++){
      const product = products[i];
      const { _id, imageUrl, altTxt, name, description } = product;
      const link = productLink(_id);
      const article = document.createElement('article');
      const image = productImage(imageUrl, altTxt); 
      const title = productTitle(name);
      const info = productDescription(description);
      append(container, link);
      append(link, article);
      append(article, image);
      append(article, title);
      append(article, info);

   }
};
// Création du bloc lien 
productLink = (id) =>{
   let link = document.createElement('a');
   link.href = "./product.html?id="+ id;
   return link; 
};
// Création du bloc image 
productImage = (imgUrl, altTxt) =>{
   let image = document.createElement('img');
   image.src = imgUrl;
   image.alt = altTxt;
   return image; 
};
// Création du bloc nom/titre du produit 
productTitle = (name) => {
   let title = document.createElement('h3');
   title.classList.add('name');
   title.innerText = name;
   return title;
};
// Création du bloc description 
productDescription = (description) =>{
   let info = document.createElement('p');
   info.classList.add('description');
   info.innerText = description;
   return info;
};
// fonction globale pour ajout d'un enfant à un élément parent 
append = (parent, enfant)=>{
   return parent.appendChild(enfant);
};






