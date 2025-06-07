 /*import {cart, removeFromCart,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
 import { deliveryOptions } from '../data/deliveryOptions.js';

const today = dayjs();
const deliveryDate = today.add(7,'days');
console.log(deliveryDate.format('dddd,MMMM D'));
console.log(deliveryDate);
function renderOrderSummary(){

let cartSummaryHTML='';


cart.forEach((cartItem) => {
  const productId = cartItem.productId;

let matchingproduct;
  
products.forEach((product)=>{
  if(product.id ===productId){
    matchingproduct=product;
  }


//console.log(matchingproduct);
});

const deliveryOptionId=cartItem.deliveryOptionId;

let deliveryOption;

deliveryOptions.forEach((option)=>{
if(option.id===deliveryOptionId){
  deliveryOption=option;
}
});
const today=dayjs();
const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
const dateString = deliveryDate.format(
`dddd,MMMM D`
);
/*

const selectedDeliveryOption = deliveryOptions.find(option =>
  option.id === cartItem.deliveryOptionId
);

const deliveryDate = dayjs().add(selectedDeliveryOption.deliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D');



cartSummaryHTML += `
<div class="cart-item-container 
js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
             <div class="product-price">
                  $${formatCurrency(matchingproduct.priceCents)}                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>
 
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingproduct,cartItem)}
                </div>
            </div>
          </div>
`;
});
function deliveryOptionsHTML(matchingproduct,cartItem){
  let html = '';
deliveryOptions.forEach((deliveryOption)=>{
const today=dayjs();
const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
const dateString = deliveryDate.format(
`dddd,MMMM D`
);
const priceString = deliveryOption.priceCents===0
? 'FREE'
: `$${formatCurrency(deliveryOption.priceCents)} - `;

const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;


    html +=`

                      
                                      
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingproduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio"
                  ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>

`
});
return html;
}
//console.log(cartSummaryHTML);

document.querySelector('.js-order-summary')
.innerHTML=cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    
  const container=  document.querySelector(`.js-cart-item-container-${productId}`);
  console.log(container);
  container.remove();

  });
});


  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
element.addEventListener('click',()=>{
  const {productId, deliveryOptionId}=element.dataset;
updateDeliveryOption(productId,deliveryOptionId);
renderOrderSummary();
});
  });

}
renderOrderSummary();*/






// Import necessary modules and data
/*import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

// Main function to render the order summary
function renderOrderSummary() {
  let cartSummaryHTML = '';

  // Loop through each item in the cart
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the matching product using .find() for efficiency
    // If no product is found (shouldn't happen if data is consistent),
    // matchingproduct will be undefined.
    const matchingproduct = products.find(product => product.id === productId);

    // If for some reason a product isn't found, skip this cart item
    // to prevent further errors.
    if (!matchingproduct) {
      console.error(`Error: Product with ID ${productId} not found in products data.`);
      return; // Skip to the next cart item
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    // Find the matching delivery option using .find()
    let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

    // *** IMPORTANT FIX: Handle case where deliveryOption might be undefined ***
    // This happens if cartItem.deliveryOptionId doesn't match any option in deliveryOptions.
    if (!deliveryOption) {
      console.warn(`Warning: Delivery option with ID ${deliveryOptionId} not found for product ${matchingproduct.name}. Defaulting to the first available delivery option.`);
      // Fallback: Use the first available delivery option
      // Ensure deliveryOptions is not empty before accessing index 0
      if (deliveryOptions.length > 0) {
        deliveryOption = deliveryOptions[0];
        // Optionally, update the cartItem's deliveryOptionId to this new default
        // This would require a cart update function if you want to persist this change.
        // For now, we just use it for display.
      } else {
        // If no delivery options are available at all, log an error and skip
        console.error("Critical Error: No delivery options defined.");
        return; // Skip this cart item entirely
      }
    }

    // Calculate delivery date based on the found (or defaulted) delivery option
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Build the HTML for the current cart item
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingproduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingproduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingproduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingproduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Function to generate HTML for delivery options for a specific product
  function deliveryOptionsHTML(matchingproduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} - `;

      // Check if this delivery option is currently selected for the cart item
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingproduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }

  // Insert the generated HTML into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add event listeners for delete links
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId); // Remove from cart data
      // Remove the corresponding HTML element from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
      }
      // Re-render the order summary to update totals/counts if needed
      // (Though this specific example only removes the item, not updates totals)
      renderOrderSummary(); // Re-render to update delivery dates if other items are affected
    });
  });

  // Add event listeners for delivery option radio buttons
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); // Update cart data
      renderOrderSummary(); // Re-render to reflect the new delivery date
    });
  });
}

// Initial call to render the order summary when the page loads
renderOrderSummary();



//import { renderOrderSummary } from "./checkout/orderSummary";
//renderOrderSummary();*/
// Import necessary modules and data
/*import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

// Main function to render the order summary (left side of checkout)
export function renderOrderSummary() { // Exported for potential use by other modules (e.g., when adding items)
  let cartSummaryHTML = '';

  // Loop through each item in the cart to build the HTML for product details
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the matching product using .find() for efficiency
    const matchingProduct = products.find(product => product.id === productId);

    // If for some reason a product isn't found, log an error and skip this cart item
    if (!matchingProduct) {
      console.error(`Error: Product with ID ${productId} not found in products data.`);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    // Find the matching delivery option using .find()
    let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

    // Handle case where deliveryOption might be undefined (e.g., if cart data is old)
    if (!deliveryOption) {
      console.warn(`Warning: Delivery option with ID ${deliveryOptionId} not found for product ${matchingProduct.name}. Defaulting to the first available delivery option.`);
      // Fallback: Use the first available delivery option
      if (deliveryOptions.length > 0) {
        deliveryOption = deliveryOptions[0];
        // In a real application, you might want to update the cartItem's
        // deliveryOptionId here to persist this default.
      } else {
        console.error("Critical Error: No delivery options defined. Cannot render order summary.");
        return;
      }
    }

    // Calculate delivery date based on the found (or defaulted) delivery option
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    // Build the HTML for the current cart item
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Insert the generated HTML for cart items into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add event listeners for delete links
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId); // Remove from cart data

      // Remove the corresponding HTML element from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
      }
      // Re-render the order summary and payment summary to reflect changes
      renderOrderSummary();
      renderPaymentSummary(); // Call payment summary update after deletion
    });
  });

  // Add event listeners for delivery option radio buttons
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); // Update cart data
      renderOrderSummary(); // Re-render product details to show new delivery date
      renderPaymentSummary(); // Re-render payment summary to update shipping cost
    });
  });

  // After rendering the order summary, also update the payment summary
  renderPaymentSummary();
}

// Function to generate HTML for delivery options for a specific product
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} - `;

    // Check if this delivery option is currently selected for the cart item
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

// Function to calculate and render the payment summary (right side of checkout)
function renderPaymentSummary() {
  let totalItemsPriceCents = 0;
  let totalShippingPriceCents = 0;
  let cartQuantity = 0; // To update the "Items (X)" count

  // Calculate totals by iterating through the cart
  cart.forEach((cartItem) => {
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    if (matchingProduct) {
      totalItemsPriceCents += matchingProduct.priceCents * cartItem.quantity;
      cartQuantity += cartItem.quantity; // Sum up total quantity

      const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
      if (deliveryOption) {
        totalShippingPriceCents += deliveryOption.priceCents;
      }
    }
  });

  const totalBeforeTaxCents = totalItemsPriceCents + totalShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; // Assuming 10% tax
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  // Generate HTML for the payment summary
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalItemsPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-price">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-price">
        $${formatCurrency(orderTotalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  // Insert the generated HTML into the payment summary section
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

// Initial call to render the order summary when the page loads
renderOrderSummary();
// The renderOrderSummary function now calls renderPaymentSummary internally
// so a separate initial call for renderPaymentSummary is not strictly needed
// if renderOrderSummary is always called first.

// Import necessary modules and data
import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

// Main function to render the order summary (left side of checkout)
export function renderOrderSummary() {
  let cartSummaryHTML = '';

  // Loop through each item in the cart to build the HTML for product details
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the matching product using .find() for efficiency
    const matchingProduct = products.find(product => product.id === productId);

    // If for some reason a product isn't found, log an error and skip this cart item
    if (!matchingProduct) {
      console.error(`Error: Product with ID ${productId} not found in products data.`);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    // --- Start of logic for the main "Delivery date:" line ---
    let displayDeliveryDateString;
    const today = dayjs();

    // Find the currently selected delivery option for this cart item
    const selectedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

    // Check if the selected delivery option is valid and has valid deliveryDays
    if (selectedDeliveryOption && typeof selectedDeliveryOption.deliveryDays === 'number' && !isNaN(selectedDeliveryOption.deliveryDays)) {
      // If valid, calculate the date based on the selected option
      const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
      displayDeliveryDateString = deliveryDate.format('dddd, MMMM D');
    } else {
      // If the selected delivery option or its deliveryDays is invalid,
      // display a fallback date: "Approx. 2 days from now"
      const fallbackDeliveryDate = today.add(2, 'days');
      displayDeliveryDateString = `Approx. ${fallbackDeliveryDate.format('dddd, MMMM D')}`;
      console.warn(`Warning: Selected delivery option ID "${deliveryOptionId}" for product "${matchingProduct.name}" is invalid or not found. Displaying fallback date.`);
    }
    // --- End of logic for the main "Delivery date:" line ---

    // Build the HTML for the current cart item
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${displayDeliveryDateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Insert the generated HTML for cart items into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add event listeners for delete links
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId); // Remove from cart data

      // Remove the corresponding HTML element from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
      }
      // Re-render the order summary and payment summary to reflect changes
      renderOrderSummary();
      renderPaymentSummary(); // Call payment summary update after deletion
    });
  });

  // Add event listeners for delivery option radio buttons
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); // Update cart data
      renderOrderSummary(); // Re-render product details to show new delivery date
      renderPaymentSummary(); // Re-render payment summary to update shipping cost
    });
  });

  // After rendering the order summary, also update the payment summary
  renderPaymentSummary();
}

// Function to generate HTML for delivery options for a specific product
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  const today = dayjs(); // Define today once for this function

  deliveryOptions.forEach((deliveryOption) => {
    // This part already handles invalid deliveryDays by defaulting to 0,
    // so it will show a valid date for each radio option, not "Invalid Date".
    const validDeliveryDays = typeof deliveryOption.deliveryDays === 'number' && !isNaN(deliveryOption.deliveryDays)
      ? deliveryOption.deliveryDays
      : 0; // Default to 0 days if invalid

    const optionDeliveryDate = today.add(validDeliveryDays, 'days');
    const optionDateString = optionDeliveryDate.format('dddd, MMMM D');

    const validPriceCents = typeof deliveryOption.priceCents === 'number' && !isNaN(deliveryOption.priceCents)
      ? deliveryOption.priceCents
      : 0;

    const priceString = validPriceCents === 0
      ? 'FREE'
      : `$${formatCurrency(validPriceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${optionDateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

// Function to calculate and render the payment summary (right side of checkout)
function renderPaymentSummary() {
  let totalItemsPriceCents = 0;
  let totalShippingPriceCents = 0;
  let cartQuantity = 0; // To update the "Items (X)" count

  // Calculate totals by iterating through the cart
  cart.forEach((cartItem) => {
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    if (matchingProduct) {
      totalItemsPriceCents += matchingProduct.priceCents * cartItem.quantity;
      cartQuantity += cartItem.quantity; // Sum up total quantity

      const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
      
      // Ensure deliveryOption exists and priceCents is a valid number before adding to total
      if (deliveryOption && typeof deliveryOption.priceCents === 'number' && !isNaN(deliveryOption.priceCents)) {
        totalShippingPriceCents += deliveryOption.priceCents;
      } else if (deliveryOption) { // If deliveryOption exists but priceCents is invalid
          console.warn(`Warning: Invalid priceCents for delivery option ID ${deliveryOption.id}. Assuming 0 shipping cost for calculation.`);
      } else { // If deliveryOption is not found
          console.warn(`Warning: Delivery option ID ${cartItem.deliveryOptionId} not found for product ${matchingProduct.name}. Assuming 0 shipping cost for calculation.`);
      }
    }
  });

  const totalBeforeTaxCents = totalItemsPriceCents + totalShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; // Assuming 10% tax
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  // Generate HTML for the payment summary
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalItemsPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-price">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-price">
        $${formatCurrency(orderTotalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  // Insert the generated HTML into the payment summary section
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

// Initial call to render the order summary when the page loads
renderOrderSummary();
*/
// Import necessary modules and data
import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

// Main function to render the order summary (left side of checkout)
export function renderOrderSummary() {
  let cartSummaryHTML = '';

  // Loop through each item in the cart to build the HTML for product details
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Find the matching product using .find() for efficiency
    const matchingProduct = products.find(product => product.id === productId);

    // If for some reason a product isn't found, log an error and skip this cart item
    if (!matchingProduct) {
      console.error(`Error: Product with ID ${productId} not found in products data.`);
      return;
    }

    const deliveryOptionId = cartItem.deliveryOptionId;

    // --- Start of logic for the main "Delivery date:" line ---
    let displayDeliveryDateString;
    const today = dayjs();

    // Find the currently selected delivery option for this cart item
    const selectedDeliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);

    // Check if the selected delivery option is valid and has valid deliveryDays
    if (selectedDeliveryOption && typeof selectedDeliveryOption.deliveryDays === 'number' && !isNaN(selectedDeliveryOption.deliveryDays)) {
      // If valid, calculate the date based on the selected option
      const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'days');
      displayDeliveryDateString = deliveryDate.format('dddd, MMMM D');
    } else {
      // If the selected delivery option or its deliveryDays is invalid,
      // display a fallback date: "Approx. 2 days from now"
      const fallbackDeliveryDate = today.add(2, 'days');
      displayDeliveryDateString = `Approx. ${fallbackDeliveryDate.format('dddd, MMMM D')}`;
      console.warn(`Warning: Selected delivery option ID "${deliveryOptionId}" for product "${matchingProduct.name}" is invalid or not found. Displaying fallback date.`);
    }
    // --- End of logic for the main "Delivery date:" line ---

    // Build the HTML for the current cart item
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${displayDeliveryDateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  // Insert the generated HTML for cart items into the page
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // Add event listeners for delete links
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId); // Remove from cart data
      console.log('Cart after removeFromCart:', cart); // Debugging: Log cart after removal

      // Remove the corresponding HTML element from the DOM
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      if (container) {
        container.remove();
      }
      // Re-render the order summary and payment summary to reflect changes
      renderOrderSummary();
      renderPaymentSummary(); // Call payment summary update after deletion
    });
  });

  // Add event listeners for delivery option radio buttons
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId); // Update cart data
      console.log('Cart after updateDeliveryOption:', cart); // Debugging: Log cart after option update
      renderOrderSummary(); // Re-render product details to show new delivery date
      renderPaymentSummary(); // Re-render payment summary to update shipping cost
    });
  });

  // After rendering the order summary, also update the payment summary
  renderPaymentSummary();
}

// Function to generate HTML for delivery options for a specific product
function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  const today = dayjs(); // Define today once for this function

  deliveryOptions.forEach((deliveryOption) => {
    // This part already handles invalid deliveryDays by defaulting to 0,
    // so it will show a valid date for each radio option, not "Invalid Date".
    const validDeliveryDays = typeof deliveryOption.deliveryDays === 'number' && !isNaN(deliveryOption.deliveryDays)
      ? deliveryOption.deliveryDays
      : 0; // Default to 0 days if invalid

    const optionDeliveryDate = today.add(validDeliveryDays, 'days');
    const optionDateString = optionDeliveryDate.format('dddd, MMMM D');

    const validPriceCents = typeof deliveryOption.priceCents === 'number' && !isNaN(deliveryOption.priceCents)
      ? deliveryOption.priceCents
      : 0;

    const priceString = validPriceCents === 0
      ? 'FREE'
      : `$${formatCurrency(validPriceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${optionDateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

// Function to calculate and render the payment summary (right side of checkout)
function renderPaymentSummary() {
  let totalItemsPriceCents = 0;
  let totalShippingPriceCents = 0;
  let cartQuantity = 0; // To update the "Items (X)" count

  // Calculate totals by iterating through the cart
  cart.forEach((cartItem) => {
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    if (matchingProduct) {
      totalItemsPriceCents += matchingProduct.priceCents * cartItem.quantity;
      cartQuantity += cartItem.quantity; // Sum up total quantity

      const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);
      
      // Ensure deliveryOption exists and priceCents is a valid number before adding to total
      if (deliveryOption && typeof deliveryOption.priceCents === 'number' && !isNaN(deliveryOption.priceCents)) {
        totalShippingPriceCents += deliveryOption.priceCents;
      } else if (deliveryOption) { // If deliveryOption exists but priceCents is invalid
          console.warn(`Warning: Invalid priceCents for delivery option ID ${deliveryOption.id}. Assuming 0 shipping cost for calculation.`);
      } else { // If deliveryOption is not found
          console.warn(`Warning: Delivery option ID ${cartItem.deliveryOptionId} not found for product ${matchingProduct.name}. Assuming 0 shipping cost for calculation.`);
      }
    }
  });

  const totalBeforeTaxCents = totalItemsPriceCents + totalShippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1; // Assuming 10% tax
  const orderTotalCents = totalBeforeTaxCents + taxCents;

  console.log('--- Payment Summary Calculation ---'); // Debugging: Start of calculation log
  console.log('Total Items Price (Cents):', totalItemsPriceCents);
  console.log('Total Shipping Price (Cents):', totalShippingPriceCents);
  console.log('Total Before Tax (Cents):', totalBeforeTaxCents);
  console.log('Estimated Tax (Cents):', taxCents);
  console.log('Order Total (Cents):', orderTotalCents);
  console.log('---------------------------------'); // Debugging: End of calculation log


  // Generate HTML for the payment summary
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalItemsPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalShippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-price">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-price">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-price">
        $${formatCurrency(orderTotalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  // Insert the generated HTML into the payment summary section
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

// Initial call to render the order summary when the page loads
renderOrderSummary();



