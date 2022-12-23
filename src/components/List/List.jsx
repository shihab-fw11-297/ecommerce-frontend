import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
// import { useEffect, useState } from "react";

const List = ({data}) =>{

   

    return (
        <div className="list">
            {data?.map((item) => <Card item={item} key={item.id} />)}
        </div>
    )
}

export default List;