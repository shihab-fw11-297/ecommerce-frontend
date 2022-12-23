import { useEffect, useState } from "react";
import axios from "axios";
import './Singleorder.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Singleorder = () => {
    const currentUser = useSelector((state) => state.user);
    const para = useParams();
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get(`https://ecommerce-service.onrender.com/api/order/singleOrders/${para.id}`).then((res) => {
                setData(res.data[0].products);
            })
        };
        fetchPosts();
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <Navbar />
            <div className="singleOrderContainer">
                <h1 className="title">Your Order Full Details</h1>

                <div className="singleOrderWrapper">
                    <div className="infos">
                        <div className="product">
                            <div className="productDetails">
                                <div className="details">
                                    <div className="productTitle">
                                        Account
                                    </div>
                                    <span className="productId">
                                        <b>Name :  {currentUser.currentUser.fname} {currentUser.currentUser.lname}</b>
                                    </span>

                                    <span className="productId">
                                        <b>User email : {currentUser.currentUser.email}</b>
                                    </span>

                                    <span className="productId">
                                        <b>Shipping Address : {currentUser.currentUser.address}</b>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="productDetails">
                                <div className="details">
                                    <div className="productTitle">
                                        ORDERS
                                    </div>
                                    <div className="productTitle">
                                        Orders & Returns
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product">
                            <div className="productDetails">
                                <div className="details">
                                    <div className="productTitle">
                                        <b>CREDITS </b>
                                    </div>

                                    <div className="productId">
                                        <b> Coupons </b>
                                    </div>

                                    <div className="productId">
                                        <b> Champion Credit</b>
                                    </div>

                                    <div className="productId">
                                        <b> Champion Cash</b>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="infos">
                        {data?.map((product) => (
                            <Link to={`/product/${product.productId}`}>
                                <div className="product">
                                    <div className="productDetails">
                                        <img src={product.img} alt="" />
                                        <div className="details">
                                            <div className="ProductName">
                                                <b>Product Id : {product.productId} </b>
                                            </div>

                                            <div className="ProductName">
                                                <b>Product Name: {product.name}</b>
                                            </div>

                                            <div className="ProductName">
                                                <b>Product Price :  ₹{product.price}</b>
                                            </div>

                                            <div className="ProductName">
                                                <b>Qty : {product.quantity} </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Singleorder;