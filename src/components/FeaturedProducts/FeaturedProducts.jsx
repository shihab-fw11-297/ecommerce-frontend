import React, { useState } from "react";
import "./FeaturedProducts.scss";
import Card from '../Card/Card';
import Carousel from "react-elastic-carousel";
import useFetch from "../../hooks/useFetch";
import Loading from '../Loading/Loading';

const FeaturedProducts = ({ type }) => {
    const { data, loading } = useFetch("https://ecommerce-service.onrender.com/api/products");
    // console.log("receive data", data)

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 400, itemsToShow: 2 },
        { width: 668, itemsToShow: 4 },
        { width: 1100, itemsToShow: 5 }
    ];



    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                    suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                    lacus vel facilisis labore et dolore magna aliqua.
                </p>
            </div>
            {loading ?
                <div className="bottom">
                    <Loading />
                </div>
                :
                <div className="bottom">
                    {type === "featured" ?
                        <Carousel breakPoints={breakPoints}>
                            {data?.map((item) => <Card item={item} key={item._id} />)}
                        </Carousel>
                        :
                        <Carousel breakPoints={breakPoints}>
                            {data?.filter((item) => item.isNew === true).map((item) => <Card item={item} key={item._id} />)}
                        </Carousel>
                    }
                </div>
            }
        </div>
    )
}

export default FeaturedProducts;