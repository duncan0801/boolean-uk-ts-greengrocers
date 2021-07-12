import "./style.css";
import "../styles/reset.css";
import "../styles/index.css";

type MyList = [number?, string?, boolean?];
const arr: MyList = [];

interface StoreItem {
	id: string;
	name: string;
	price: number;
}
interface State {
	store: StoreItem[];
}

const state: State = {
	store: [
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
};

console.log(state);
