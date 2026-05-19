let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let existingProduct = cart.find(item => item.name === name);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart");
}

function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let subtotalElement = document.getElementById("subtotal");
  let grandTotalElement = document.getElementById("grand-total");

  if (!cartItems) {
    return;
  }

  cartItems.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    let total = item.price * item.quantity;
    subtotal += total;

    cartItems.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>P${item.price}</td>
        <td>
          <button class="btn btn-sm btn-dark" onclick="decreaseQuantity(${index})">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-dark" onclick="increaseQuantity(${index})">+</button>
        </td>
        <td>P${total}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
        </td>
      </tr>
    `;
  });

  let delivery = cart.length > 0 ? 30 : 0;
  let grandTotal = subtotal + delivery;

  subtotalElement.textContent = subtotal;
  document.getElementById("delivery").textContent = delivery;
  grandTotalElement.textContent = grandTotal;
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function decreaseQuantity(index) {
  cart[index].quantity -= 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  alert("Thank you for your order!");
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
}

displayCart();