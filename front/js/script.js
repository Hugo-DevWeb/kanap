fetch("http://localhost:3000/api/products/")
   .then(res => res.json())
   .then(data => {
      console.log(data)
      getAllProducts(data);
   });
   


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
productLink = (id) =>{
   let link = document.createElement('a');
   container.appendChi
   link.href = "./product.html?id="+ id;
   return link; 
};
productImage = (imgUrl, altTxt) =>{
   let image = document.createElement('img');
   image.src = imgUrl;
   image.alt = altTxt;
   return image; 
};

productTitle = (name) => {
   let title = document.createElement('h3');
   title.classList.add('name');
   title.innerText = name;
   return title;
};
productDescription = (description) =>{
   let info = document.createElement('p');
   info.classList.add('description');
   info.innerText = description;
   return info;
};
append = (parent, enfant)=>{
   return parent.appendChild(enfant);
};
const container = document.getElementById('items');
localStorage.quantity;
console.log(localStorage.quantity);



