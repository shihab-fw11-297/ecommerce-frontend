import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { useDispatch } from "react-redux";
// import {useState} from'react';

const Cart = ({setOpen,open,totalPrice,setModalIsOpen}) => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    // const [open, setOpen] = useState(false)

    const setModalIsOpenToTrue = () => {
        setModalIsOpen(true);
        setOpen(!open)
      };


    return (
        <>
        <div className={"cart"}>
            <h1>Products in your cart</h1>
            {products?.map((item) => (
                <div className="item" key={item.id}>
                    <img src={item.img} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.desc?.substring(0, 50)}</p>
                        <div className="price">
                            {item.quantity} x ₹{item.price}
                        </div>
                    </div>
                    <DeleteOutlinedIcon className="delete"
                     onClick={() => dispatch(removeItem(item.id))}
                    />
                </div>
            ))}

            <div className="total">
                <span>SUBTOTAL</span>
                <span>₹{totalPrice()}</span>
            </div>
            {/* onClick={() => setOpen(!open) */}
            <button  onClick={() => setModalIsOpenToTrue()} >PROCEED TO PAY</button>
            <span className="reset" onClick={() => dispatch(resetCart())}>
                Reset Cart
            </span>
        </div>
        </>
    )
}

export default Cart;

