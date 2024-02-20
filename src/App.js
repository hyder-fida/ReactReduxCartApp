import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);



  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

// const newTotalQuantity = cart.totalQuantity + 1;

// const updatedItems = cart.items.slice(); // create copy via slice to avoid mutating original state
// const existingItem = updatedItems.find((item) => item.id === id);
// if (existingItem) {
//   const updatedItem = { ...existingItem }; // new object + copy existing properties to avoid state mutation
//   updatedItem.quantity++;
//   updatedItem.totalPrice = updatedItem.totalPrice + price;
//   const existingItemIndex = updatedItems.findIndex(
//     (item) => item.id === id
//   );
//   updatedItems[existingItemIndex] = updatedItem;
// } else {
//   updatedItems.push({
//     id: id,
//     price: price,
//     quantity: 1,
//     totalPrice: price,
//     name: title,
//   });
// }

// const newCart = {
//   totalQuantity: newTotalQuantity,
//   items: updatedItems,
// };

// dispatch(cartActions.replaceCart(newCart));
