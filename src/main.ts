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

// finding tore and cart list items for appending of items
const storeList = document.querySelector(".store--item-list");
const cartList = document.querySelector(".cart--item-list");

//RENDER FUNCITONS
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
function renderCartItem(cartItem: CartItem) {
	const targetItem = state.products.find(
		(product) => product.id === cartItem.id
	);

	let newCartLiEL = document.createElement("li");

	let cartIconImgEl = document.createElement("img");
	cartIconImgEl.setAttribute(
		"src",
		`../assets/icons/${targetItem && targetItem.id}.svg`
	);
	cartIconImgEl.setAttribute("alt", `${targetItem && targetItem.name}`);

	let nameEl = document.createElement("p");
	nameEl.innerText = targetItem && targetItem.name;

	let removeButton = document.createElement("button");
	removeButton.setAttribute("class", "quantity-btn remove-btn center");
	removeButton.innerText = "-";
	removeButton.addEventListener("click", () =>
		removeItemFromCart(cartItem.id)
	);

	let quantityEl = document.createElement("span");
	quantityEl.innerText = cartItem.quantity;

	let addButton = document.createElement("button");
	addButton.setAttribute("class", "quantity-btn add-btn center");
	addButton.innerText = "+";
	addButton.addEventListener("click", () => addItemToCart(cartItem.id));

	newCartLiEL.append(
		cartIconImgEl,
		nameEl,
		removeButton,
		quantityEl,
		addButton
	);
	cartList && cartList.append(newCartLiEL);
}
function renderCart() {
	if (cartList) cartList.innerHTML = "";

	for (let cartItem of state.cart) {
		renderCartItem(cartItem);
	}
}

//ACTION FUNCTIONS
function addItemToCart(itemId: string) {
	// if item is already in cart then increase that item quanity
	const foundItem: CartItem | undefined = state.cart.find(
		(cartItem) => cartItem.id === itemId
	);

	if (foundItem) {
		state.cart = state.cart.map((cartItem) => {
			if (cartItem === foundItem) {
				return {
					id: cartItem.id,
					quantity: ++cartItem.quantity,
				};
			}
			return cartItem;
		});
	} else {
		const newCartItem: CartItem = {
			id: itemId,
			quantity: 1,
		};
		state.cart.push(newCartItem);
	}
	calculateTotal();
	renderCart();
	console.log(state.cart);
}
function removeItemFromCart(itemId: string) {
	const targetItem = state.cart.find((cartItem) => cartItem.id === itemId);
	const targetItemIndex = state.cart.findIndex(
		(cartItem) => cartItem.id === itemId
	);

	if (targetItem?.quantity === 1) {
		state.cart.splice(targetItemIndex, 1);
	} else {
		state.cart = state.cart.map((cartItem) => {
			if (cartItem.id === itemId) {
				return {
					id: cartItem.id,
					quantity: --cartItem.quantity,
				};
			}
			return cartItem;
		});
	}
	calculateTotal();
	renderCart();
}
function calculateTotal() {
	const totalEl = document.querySelector(".total-number");

	let total: number = 0;
	state.cart.map((cartItem) => {
		const targetProduct = state.products.find(
			(product) => product.id === cartItem.id
		);
		total += cartItem.quantity * targetProduct.price;
	});

	totalEl.innerText = `£${total.toFixed(2)}`;
}
renderStore();
