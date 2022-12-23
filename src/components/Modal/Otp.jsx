import "./payment.css";
import { useSelector } from "react-redux";
import axios from "axios";
// import { useHistory } from "react-router";
import { resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Otp = (price) => {
  const products = useSelector((state) => state.cart.products);
  const currentUser = useSelector((state) => state.user.currentUser);
  // const history = useHistory();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

    const createOrder = async () => {
      try {
        await axios.post("https://ecommerce-service.onrender.com/api/order", {
          userId: currentUser._id,
          products: products.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            name:item.title,
            img:item.img,
            price:item.price,
          })),
          amount: totalPrice(),
          address:"vapi"
        });
        dispatch(resetCart(""));
        navigate("/success");

      } catch(err) {
        console.log(err);
      }
    };

  return (
    <div>
      <div id="body-phone">
        <div id="heading-phone">Paytm Wallet</div>
        <div id="enter">Enter the 6-digit code sent to your Number </div>
        <div id="enter-number">
          <input id="otp"
            type="text"
            maxlength="6"
          />
        </div>
        <div id="info">Haven't recieved the OTP</div>
        <p>resend OTP</p>
        {/* onClick={createOrder} */}
        <button id="btn-2" onClick={createOrder}>CONFIRM</button>
      </div>
    </div>
  );
};