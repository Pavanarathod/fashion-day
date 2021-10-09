import { ReactComponent as ShippingIcon } from "../assets/bag.svg";

const ShoppingCart = ({ total }) => {
  return (
    <div>
      <ShippingIcon />
      <p>{total}</p>
    </div>
  );
};

export default ShoppingCart;
