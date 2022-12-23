import React from 'react'
import './Product.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import Carousel from "react-elastic-carousel";
import Loading from '../../components/Loading/Loading';

const Product = () => {
    const [selectedImg, setSelectedImg] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, loading } = useFetch(`https://ecommerce-service.onrender.com/api/products/find/${id}`);
    const [size, setSize] = useState("");
    let discount = (data.oldPrice - data.price) / data.oldPrice * 100;
    const dispatch = useDispatch();


    return (
        <>
            <Navbar />
            {
                loading ?

                    <Loading />
                    :
                    <div className='product'>
                        <div className="left">
                            <div className="images">
                                <img src={data.image && data.image[0]} alt="" onClick={(e) => setSelectedImg(0)} />
                                <img src={data.image && data.image[1]} alt="" onClick={(e) => setSelectedImg(1)} />
                                <img src={data.image && data.image[2]} alt="" onClick={(e) => setSelectedImg(2)} />
                            </div>

                            <div className="mainImg">
                                <img src={data.image && data.image[selectedImg]} alt="" />
                            </div>
                        </div>

                        <div className="mobLeftSlider">
                            <Carousel>
                                <img src={data.image && data.image[0]} alt="" />
                                <img src={data.image && data.image[1]} alt="" />
                                <img src={data.image && data.image[2]} alt="" />
                            </Carousel>
                        </div>

                        <div className="right">
                            <h1>{data.title}</h1>
                            <div className="priceDetail">
                                <div className="flex">
                                    <div className="pricedata">
                                        <span className='price'>Rs.{data.price}</span>
                                        <span className='oldPrice'>Rs.{data.oldPrice}</span>
                                    </div>
                                    <span className="discount">({Math.ceil(discount)}% OFF)</span>
                                </div>
                                <span className="taxes">(Inclusive of all taxes)</span>
                            </div>

                            <p>{data.description}</p>
                            <div className="flex">
                                <div className="quantity">
                                    <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
                                    {quantity}
                                    <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
                                </div>

                                <div className="size">
                                    <h3>Size & fit</h3>
                                    <select onChange={(e) => setSize(e.target.value)}>
                                        {data.size?.map((s) => (
                                            <option key={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                className="add"
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            id: data._id,
                                            title: data.title,
                                            desc: data.description,
                                            price: data.price,
                                            img: data.image[0],
                                            quantity,
                                        })
                                    )
                                }
                            >
                                <AddShoppingCartIcon /> ADD TO CART
                            </button>

                            <div className="links">
                                <div className="item">
                                    <FavoriteBorderIcon /> ADD TO WISH LIST
                                </div>
                                <div className="item">
                                    <BalanceIcon /> ADD TO COMPARE
                                </div>
                            </div>
                            <div className="info">
                                <span>Vendor: Abc.co.lted</span>
                                <span>Product Type: fashion</span>
                                <span>Tag: T-Shirt,Shoes, Men,Women</span>
                            </div>
                            {/* <hr /> */}
                            <div className="otherInfo">
                                <div className="delivery">
                                    <p style={{ fontWeight: "500" }}>DELIVERY OPTIONS</p>
                                    <p>Usually Ships in 3-4 Days</p>
                                    <p>100% Originals</p>
                                    <p>Free shipping on order above Rs. 600</p>
                                    <p>Non Returnable</p>
                                </div>
                                {/* <hr /> */}
                                <p style={{ fontWeight: "500" }}>ADDITIONAL INFORMATION</p>
                                {/* <hr /> */}
                                <p style={{ fontWeight: "500" }}>FAQ</p>
                            </div>
                        </div>
                    </div>
            }
            <Footer />
        </>
    )
}

export default Product