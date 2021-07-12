import "./style.css";
import "../styles/reset.css";
import "../styles/index.css";

//Type Interfaces
interface StoreItem {
	id: string;
	name: string;
	price: number;
}
interface State {
	products: StoreItem[];
	cart: CartItem[];
}
interface CartItem {
	id: string;
	quantity: number;
}

// State object
const state: State = {
	products: [
		{
			id: "001-beetroot",
			name: "beetroot",
			price: 0.35,
		},
		{
			id: "002-carrot",
			name: "carrot",
			price: 0.5,
		},
		{
			id: "003-apple",
			name: "apple",
			price: 1.25,
		},
		{
			id: "004-apricot",
			name: "apricot",
			price: 0.65,
		},
		{
			id: "005-avocado",
			name: "avocado",
			price: 1.0,
		},
		{
			id: "006-bananas",
			name: "bananas",
			price: 2.0,
		},
		{
			id: "007-bell-pepper",
			name: "bell pepper",
			price: 0.45,
		},
		{
			id: "008-berry",
			name: "berry",
			price: 0.35,
		},
		{
			id: "009-blueberry",
			name: "blueberry",
			price: 0.9,
		},
	],
	cart: [],
};

const storeList  = document.querySelector(".store--item-list");
const cartList  = document.querySelector(".cart--item-list");


function renderStoreListItem(itemId: string, itemName: string) {
	const storeListItem = document.createElement("li");
	storeListItem.innerHTML = `
    <div class="store--item-icon">
      <img src="../assets/icons/${itemId}.svg" alt="${itemName}">
    </div>
  `;
	const addToCartButton = document.createElement("button");
	addToCartButton.innerText = "ADD TO CART";
	addToCartButton.addEventListener("click", () => addItemToCart(itemId));

	storeListItem.append(addToCartButton);
	storeList && storeList.append(storeListItem);
}
function renderStore() {
	for (let product of state.products) {
		renderStoreListItem(product.id, product.name);
	}
}
function addItemToCart(itemId: string) {
	const newCartItem: CartItem = {
		id: itemId,
		quantity: 1,
	};
	state.cart.push(newCartItem);
    renderCart()
	console.log(state.cart);
}
// function addToCart() {}
renderStore();

function renderCartItem(cartItem: CartItem) {

    const targetItem = state.products.find((product) => product.id === cartItem.id)
    
    let newCartLiEL = document.createElement("li")

    let cartIconImgEl = document.createElement("img")
    cartIconImgEl.setAttribute("src", `../assets/icons/${targetItem && targetItem.id}.svg` )
    cartIconImgEl.setAttribute("alt", `${targetItem && targetItem.name}`)
  
    let nameEl = document.createElement("p")
    nameEl.innerText = targetItem && targetItem.name
  
    let removeButton = document.createElement("button")
    removeButton.setAttribute("class", "quantity-btn remove-btn center")
  
    let quantityEl = document.createElement("span")
    quantityEl.innerText = cartItem.quantity
  
    let addButton = document.createElement("button")
    addButton.setAttribute("class", "quantity-btn add-btn center")
  
    newCartLiEL.append(cartIconImgEl, nameEl, removeButton, quantityEl, addButton)
    cartList && cartList.append(newCartLiEL)
}
function renderCart() {
    cartList.innerHTML = ""

    for (let cartItem of state.cart) {
        renderCartItem(cartItem)
    }
}

console.log(state);
