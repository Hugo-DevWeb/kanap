const queryString = window.location.search;
const urlParams = new URLSearchParams (queryString);
// const orderId = 
console.log(orderId);
let orderBloc = document.getElementById('orderId');

orderBloc.textContent = urlParams.get ('orderId');
//  orderId;