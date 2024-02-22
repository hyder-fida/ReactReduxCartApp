import { uiActions } from './ui-slice'; // Import UI slice actions
import { cartActions } from './cart-slice'; // Import cart slice actions

// Async action creator to fetch cart data from the server
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      // Function to fetch cart data
      const response = await fetch(
        'https://redux-cart-ca90d-default-rtdb.firebaseio.com/cart.json'
      ); // Fetch cart data from server

      if (!response.ok) {
        // If response is not OK (status code other than 200)
        throw new Error('Could not fetch cart data!'); // Throw an error
      }

      const data = await response.json(); // Parse response data

      return data; // Return the parsed data
    };

    try {
      const cartData = await fetchData(); // Call fetchData function to fetch cart data
      dispatch(
        cartActions.replaceCart({
          // Dispatch an action to replace cart data in the store
          items: cartData.items || [], // Replace cart items
          totalQuantity: cartData.totalQuantity, // Replace total quantity
        })
      );
    } catch (error) {
      // If an error occurs during fetching cart data
      dispatch(
        uiActions.showNotification({
          // Dispatch an action to show a notification
          status: 'error', // Set notification status to error
          title: 'Error!', // Set notification title
          message: 'Fetching cart data failed!', // Set notification message
        })
      );
    }
  };
};

// Async action creator to send cart data to the server
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        // Dispatch an action to show a notification
        status: 'pending', // Set notification status to pending
        title: 'Sending...', // Set notification title
        message: 'Sending cart data!', // Set notification message
      })
    );

    const sendRequest = async () => {
      // Function to send cart data to server
      const response = await fetch(
        'https://redux-cart-ca90d-default-rtdb.firebaseio.com/cart.json', // URL to send cart data
        {
          method: 'PUT', // HTTP method
          body: JSON.stringify({
            // Request body (cart data)
            items: cart.items, // Cart items
            totalQuantity: cart.totalQuantity, // Total quantity
          }),
        }
      );

      if (!response.ok) {
        // If response is not OK (status code other than 200)
        throw new Error('Sending cart data failed.'); // Throw an error
      }
    };

    try {
      await sendRequest(); // Call sendRequest function to send cart data
      dispatch(
        uiActions.showNotification({
          // Dispatch an action to show a notification
          status: 'success', // Set notification status to success
          title: 'Success!', // Set notification title
          message: 'Sent cart data successfully!', // Set notification message
        })
      );
    } catch (error) {
      // If an error occurs during sending cart data
      dispatch(
        uiActions.showNotification({
          // Dispatch an action to show a notification
          status: 'error', // Set notification status to error
          title: 'Error!', // Set notification title
          message: 'Sending cart data failed!', // Set notification message
        })
      );
    }
  };
};
