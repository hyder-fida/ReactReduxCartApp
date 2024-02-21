import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    // Dispatch the action when the "Add to Cart" button is clicked
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );

    // Optionally, you can send an HTTP request to update the cart in the backend
    // fetch('firebase-url', { method: 'POST', body: JSON.stringify(newCart) })
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          {/* Call addToCartHandler when the button is clicked */}
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
