
/*
//export let cart = JSON.parse(localStorage.getItem('cart'));

//if(!cart){
  let cart= JSON.parse(localStorage.getItem('cart'));
 if (!cart){

 //export let  cart =
cart =
 
 [
{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryOptionId:'1'
},
{

  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryOptionId:'2'
}
];}
export {cart};
 
function saveToStorage(){                           //
  localStorage.setItem('cart',JSON.stringify(cart)); //

}


//function saveToStorage(){
//localStorage.setItem('cart',JSON.stringify(cart));


//}



export function addtoCart(productId){

let  matchingItem;
cart.forEach((cartItem)=>{

if(productId===cartItem.productId){
matchingItem=cartItem;

}
}
);

if(matchingItem){

  matchingItem.quantity+=1;
} else{

  cart.push(
{
productId: productId,
quantity: 1,
deliveryOptionId: '1'
});
}

saveToStorage();
}




 export function removeFromCart(productId){

  const newCart =[];

  cart.forEach((cartItem)=>{

if(cartItem.productId !== productId){
  newCart.push(cartItem);

}
  });

  cart = newCart;
 saveToStorage();  //
  }

 export function updateDeliveryOption(productId,deliveryOptionId){

let  matchingItem;
cart.forEach((cartItem)=>{

if(productId===cartItem.productId){
matchingItem=cartItem;

}
}
);

matchingItem.deliveryOptionId=deliveryOptionId;
saveToStorage();

  }*/
 // Initialize cart from localStorage or with default items
let cart = JSON.parse(localStorage.getItem('cart'));

// If cart is not found in localStorage, set up default items
if (!cart) {
  cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

// Export the cart variable so other modules can import it
export { cart };

// Function to save the current state of the cart to localStorage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart or increment its quantity
export function addtoCart(productId) {
  let matchingItem;

  // Check if the product already exists in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // If product exists, increment quantity; otherwise, add new product
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1' // Default delivery option for new items
    });
  }

  // Save the updated cart to localStorage
  saveToStorage();
}

// Function to remove a product from the cart
export function removeFromCart(productId) {
  const newCart = [];

  // Create a new cart array excluding the product to be removed
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  // Reassign the global cart variable to the new cart
  cart = newCart;

  // Save the updated cart to localStorage
  saveToStorage();
}

// Function to update the delivery option for a specific product in the cart
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  // Find the cart item to update
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // Update the delivery option ID for the found item
  if (matchingItem) { // Ensure matchingItem is found before trying to update
    matchingItem.deliveryOptionId = deliveryOptionId;
    // Save the updated cart to localStorage
    saveToStorage();
  } else {
    console.warn(`Product with ID ${productId} not found in cart for delivery option update.`);
  }
}
