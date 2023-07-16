import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../Store/cart-slice";
const productsArray = [
  {
    id: "1",
    title: "Bag",
    price: 6,
    description: "This product is amazing!",
  },
  {
    id: "2",
    title: "Slippers",
    price: 10,
    description: "This product is good for foot!",
  },
];
const Products = (props) => {
  const dispatch = useDispatch();
  const addCartHandler = (id) => {
    const cartItem = productsArray.find(
      (item) => String(item.id) === String(id)
    );
    dispatch(cartActions.addItemToCart(cartItem));
  };
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productsArray.map((element) => {
          return (
            <ProductItem
              key={element.id}
              id={element.id}
              title={element.title}
              price={element.price}
              description={element.description}
              onAddCartHandler={addCartHandler}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
