import React from "react";
import './Card.scss'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router';

const Card = ({ item }) => {
    const location = useLocation();

    return (
        <Link className="link" to={`/product/${item._id}`}>
            <div className={location.pathname === '/' ? 'card': 'listCard'}>
                <div className="image">
                {item.isNew && <span>New Season</span>}
                    <img src={item.image[0]} alt="" className="mainImg" />
                    <img src={item.image[1]} alt="" className="secondImg" />

                </div>
                <div className="detail">
                <h2>{item.title}</h2>
                <div className="prices">
                    <h3 className="oldPrice">₹{item.oldPrice}</h3>
                    <h3 className="itemPrice">₹{item.price}</h3>
                </div>
                </div>
            </div>
        </Link>
    )
}

export default Card