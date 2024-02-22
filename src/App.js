import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Importing hooks from react-redux for accessing Redux store

import Cart from './components/Cart/Cart'; // Importing the Cart component
import Layout from './components/Layout/Layout'; // Importing the Layout component
import Products from './components/Shop/Products'; // Importing the Products component
import Notification from './components/UI/Notification'; // Importing the Notification component
import { sendCartData, fetchCartData } from './store/cart-actions'; // Importing action creators for sending and fetching cart data

let isInitial = true; // Flag to track if the component is mounted for the first time

function App() {
  const dispatch = useDispatch(); // Initializing dispatch function to dispatch actions
  const showCart = useSelector((state) => state.ui.cartIsVisible); // Selecting cart visibility state from the Redux store
  const cart = useSelector((state) => state.cart); // Selecting cart state from the Redux store
  const notification = useSelector((state) => state.ui.notification); // Selecting notification state from the Redux store

  useEffect(() => {
    // Effect to fetch cart data when the component mounts
    dispatch(fetchCartData()); // Dispatching an action to fetch cart data from the server
  }, [dispatch]); // Dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Effect to send cart data when the cart changes
    if (isInitial) {
      // Skip the first run to prevent sending cart data on initial component mount
      isInitial = false;
      return;
    }

    if (cart.changed) {
      // Check if the cart has changed
      dispatch(sendCartData(cart)); // Dispatching an action to send cart data to the server
    }
  }, [cart, dispatch]); // Dependency array ensures this effect runs whenever cart or dispatch changes

  return (
    <Fragment>
      {notification && ( // Render the Notification component if notification exists
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />} {/* Render the Cart component if showCart is true */}
        <Products /> {/* Render the Products component */}
      </Layout>
    </Fragment>
  );
}

export default App; // Export the App component
