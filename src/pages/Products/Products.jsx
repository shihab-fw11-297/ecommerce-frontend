import List from "../../components/List/List"
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './Products.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useLocation } from "react-router";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const Products = () => {
    const location = useLocation();
    let cats = location.pathname.split("/")[2];
    const [selectCats, setSelectCats] = useState("");
    const [maxPrice, setMaxPrice] = useState(30000);
    let [items, setItems] = useState([]);
    const [sort, setSort] = useState("newest");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [showMobSortMenu, setShowMobSortMenu] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showProductCategories, setShowProductCategories] = useState(true);
    const [showProductPriceWise, setShowProductPriceWise] = useState(false);
    const [showProductColorWise, setShowProductColorWise] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://ecommerce-service.onrender.com/api/products?category=${cats}`);
                setItems(res.data);
            setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, [cats])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(cats ? `https://ecommerce-service.onrender.com/api/products?category=${cats}` :
                    `https://ecommerce-service.onrender.com/api/products`
                );
                setItems(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();

    }, [])

    useEffect(() => {
        setSelectedCheckboxes([])
        setSelectCats("")
    }, [location.pathname.split("/")[2]]);

    const handleChange = async (e) => {
        // cat = e.target.value;
        setLoading(true);

        let data = await axios.get(e.target.value
            ? `https://ecommerce-service.onrender.com/api/products?category=${e.target.value}` :
            `https://ecommerce-service.onrender.com/api/products`);

        // console.log("data",e.target.value)
        setSelectCats(e.target.value);
        if (e.target.value === 'shoes' || e.target.value === 'sandle' || e.target.value === 'slides') {
            // console.log("datas", data)
            data = data.data.filter((item) => (item.categories[0] === e.target.value && item.categories[1] === location.pathname.split("/")[2]))
            setItems(data)
            setLoading(false);
        } else {
            setItems(data.data)
            setLoading(false);
        }
        setShowFilterMenu(false)
        setShowMobSortMenu(false)
    }

    const getData = async () => {
        setLoading(true);
        let data = await axios.get(selectCats
            ? `https://ecommerce-service.onrender.com/api/products?category=${selectCats}` :
            `https://ecommerce-service.onrender.com/api/products`);

        data = data.data.filter((item) => item.price <= maxPrice);
        setItems(data);
        setLoading(false);
        // setTimeout(() => {
        setShowFilterMenu(false)
        setShowMobSortMenu(false)
        // }, 800)
    }

    const getDatas = async (maxP) => {
        setLoading(true);
        let data = await axios.get(selectCats
            ? `https://ecommerce-service.onrender.com/api/products?category=${selectCats}` :
            cats
                ? `https://ecommerce-service.onrender.com/api/products?category=${cats}` :
                `https://ecommerce-service.onrender.com/api/products`);

        data = data.data.filter((item) => item.price <= maxP);
        setItems(data);
        setLoading(false);
        // setTimeout(() => {
        setShowFilterMenu(false)
        setShowMobSortMenu(false)
        // }, 800)
    }

    useEffect(() => {
        if (sort === "newest") {
            setItems((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "asc") {
            setItems((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else {
            setItems((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort]);


    const filterByColor = async (id) => {
        //    console.log(e);
        const selectedCheckboxe = selectedCheckboxes;
        setLoading(true);

        const findIdx = selectedCheckboxe.indexOf(id);

        if (findIdx > -1) {
            selectedCheckboxe.splice(findIdx, 1);
        } else {
            selectedCheckboxe.push(id);
        }
        setSelectedCheckboxes(selectedCheckboxe);
        // console.log("unique", selectedCheckboxe);
        if (selectedCheckboxe.length !== 0) {
            let data = await axios.get(selectCats
                ? `https://ecommerce-service.onrender.com/api/products?category=${selectCats}` :
                cats
                    ? `https://ecommerce-service.onrender.com/api/products?category=${cats}` :
                    `https://ecommerce-service.onrender.com/api/products`);
            const res = data.data.filter(x => selectedCheckboxe.some(y => y === x.color[0]));
            setItems(res)
            setLoading(false);
        } else {
            let data = await axios.get(selectCats
                ? `https://ecommerce-service.onrender.com/api/products?category=${selectCats}` :
                cats
                    ? `https://ecommerce-service.onrender.com/api/products?category=${cats}` :
                    `https://ecommerce-service.onrender.com/api/products`);
            setItems(data.data)
            setLoading(false);
        }
        // console.log("unique", res);
        setShowFilterMenu(false)
        setShowMobSortMenu(false)
    }

    const handleMobPriceFilter = (price) => {
        setMaxPrice(price);
        getDatas(price);
    }

    return (
        <>
            <Navbar />
            <div className='Products'>
                <div className="left">
                    <div className="filterItem">
                        <h2>Product Categories</h2>
                        
                        <div className="cats">
                            <input type="radio" id="1" value={cats} name="cats" defaultChecked onChange={(e) => handleChange(e)} />
                            <label htmlFor="1">All</label>
                        </div>

                        <div className="cats">
                            <input type="radio" id="1" value="shoes" name="cats" onChange={(e) => handleChange(e)} />
                            <label htmlFor="1">Shoes</label>
                        </div>
                        <div className="cats">
                            <input type="radio" id="3" value="sandle" name="cats" onChange={(e) => handleChange(e)} />
                            <label htmlFor="3">sandle</label>
                        </div>
                        <div className="cats">
                            <input type="radio" id="2" value="slides" name="cats" onChange={(e) => handleChange(e)} />
                            <label htmlFor="2">Slides</label>
                        </div>
                    </div>
                    <div className="filterItem">
                        <h2>Filter by price</h2>
                        <div className="inputItem">
                            <span>0</span>
                            <input
                                type="range"
                                min={0}
                                max={30000}
                                onChange={(e) => { setMaxPrice(e.target.value); getData() }}
                            />
                            <span>{maxPrice}</span>
                        </div>
                    </div>
                    <div className="filterItem">
                        <h2>Sort by</h2>
                        <div className="inputItem">
                            <input
                                type="radio"
                                id="asc"
                                value="asc"
                                name="price"
                                onChange={(e) => setSort("New")}
                            />
                            <label htmlFor="asc">Newest</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="radio"
                                id="asc"
                                value="asc"
                                name="price"
                                onChange={(e) => setSort("asc")}
                            />
                            <label htmlFor="asc">Price (Lowest first)</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="radio"
                                id="desc"
                                value="desc"
                                name="price"
                                onChange={(e) => setSort("desc")}
                            />
                            <label htmlFor="desc">Price (Highest first)</label>
                        </div>
                    </div>

                    <div className="filterItem">
                        <h2>Filter by Color</h2>
                        <div className="inputItem">
                            <input
                                type="checkbox"
                                id="black"
                                value="black"
                                name="black"
                                onChange={(e) => filterByColor("black")}
                                selected={selectedCheckboxes.includes("black")}
                            />
                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'black', margin: '0px 5px 0px 1rem' }}></div>
                            <label htmlFor="Black">Black</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="checkbox"
                                id="blue"
                                value="blue"
                                name="blue"
                                onChange={(e) => filterByColor("blue")}
                                selected={selectedCheckboxes.includes("blue")}
                            />
                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'blue', margin: '0px 5px 0px 1rem' }}></div>
                            <label htmlFor="blue">Blue</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="checkbox"
                                id="white"
                                value="white"
                                name="white"
                                onChange={(e) => filterByColor("white")}
                                selected={selectedCheckboxes.includes("white")}
                            />
                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', margin: '0px 5px 0px 1rem' }}></div>
                            <label htmlFor="white">White</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="checkbox"
                                id="Red"
                                value="Red"
                                name="Red "
                                onChange={(e) => filterByColor("Red")}
                                selected={selectedCheckboxes.includes("Red")}
                            />
                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red', margin: '0px 5px 0px 1rem' }}></div>
                            <label htmlFor="Red">Red</label>
                        </div>

                        <div className="inputItem">
                            <input
                                type="checkbox"
                                id="Multicolour"
                                value="Multi-Colour"
                                name="Multi-Colour"
                                onChange={(e) => filterByColor("Multi-Colour")}
                                selected={selectedCheckboxes.includes("Multi-Colour")}
                            />
                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ff00e1', margin: '0px 5px 0px 1rem' }}></div>
                            <label htmlFor="Multi-color">Multi-color</label>
                        </div>
                    </div>

                </div>


                <div className="right">
                    <img
                        className="catImg"
                        src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt=""
                    />
                    {loading ? 
                    <Loading /> :
                    items.length >=1 ?
                    <List data={items} selectedCheckboxes={selectedCheckboxes} />
                    : 
                    <img className='logo' src="/img/no-product-found.png" alt="logo" />
                }
                </div>
            </div>
            {showMobSortMenu && (
                <div className="sorItem">
                    <h2>SORT BY</h2>
                    <div className="menus">
                        <p className="menu" onClick={(e) => { setSort("New"); setShowMobSortMenu(!showMobSortMenu) }} >Newest</p>
                        <p className="menu" onClick={(e) => { setSort("asc"); setShowMobSortMenu(!showMobSortMenu) }}>Price (Lowest first)</p>
                        <p className="menu" onClick={(e) => { setSort("desc"); setShowMobSortMenu(!showMobSortMenu) }}>Price (Highest first)</p>
                    </div>
                </div>
            )}

            {showFilterMenu && (
                <div className="mobfilterItem">
                    <h2>FILTERS</h2>
                    <div className="filterContainer">
                        <div className="mobleftMenu">
                            <p className="menu" style={showProductCategories ?{fontWeight:700}:{fontWeight:400}} onClick={(e) => { setShowProductCategories(true); setShowProductPriceWise(false); setShowProductColorWise(false) }}>Product Categories</p>
                            <p className="menu" style={showProductPriceWise ?{fontWeight:700}:{fontWeight:400}} onClick={(e) => { setShowProductPriceWise(true); setShowProductCategories(false); setShowProductColorWise(false) }}>Filter by price</p>
                            <p className="menu" style={showProductColorWise ?{fontWeight:700}:{fontWeight:400}} onClick={(e) => { setShowProductColorWise(true); setShowProductPriceWise(false); setShowProductCategories(false) }}>Filter by Color</p>
                        </div>
                        <div className="mobrightMenu">
                            {
                                showProductCategories && (
                                    <>
                                        <div className="cats">
                                            <input type="radio" id="1" value={cats} name="cats" defaultChecked onChange={(e) => handleChange(e)} />
                                            <label htmlFor="1">All</label>
                                        </div>

                                        <div className="cats">
                                            <input type="radio" id="1" value="shoes" name="cats" onChange={(e) => handleChange(e)} />
                                            <label htmlFor="1">Shoes</label>
                                        </div>
                                        <div className="cats">
                                            <input type="radio" id="3" value="sandle" name="cats" onChange={(e) => handleChange(e)} />
                                            <label htmlFor="3">sandle</label>
                                        </div>
                                        <div className="cats">
                                            <input type="radio" id="2" value="slides" name="cats" onChange={(e) => handleChange(e)} />
                                            <label htmlFor="2">Slides</label>
                                        </div>
                                    </>
                                )
                            }

                            {
                                showProductPriceWise && (
                                    <>
                                        <p onClick={(e) => { handleMobPriceFilter(2500) }}>Rs. 0 To Rs.2500</p>
                                        <p onClick={(e) => { handleMobPriceFilter(5000) }}>Rs. 0 To Rs.5000</p>
                                        <p onClick={(e) => { handleMobPriceFilter(10000) }}>Rs. 0 To Rs.10000</p>
                                        <p onClick={(e) => { handleMobPriceFilter(15000) }}>Rs. 0 To Rs.15000</p>
                                        <p onClick={(e) => { handleMobPriceFilter(20000) }}>Rs. 0 To Rs.20000</p>
                                        <p onClick={(e) => { handleMobPriceFilter(25000) }}>Rs. 0 To Rs.25000</p>
                                        <p onClick={(e) => { handleMobPriceFilter(30000) }}>Rs. 0 To Rs.30000</p>
                                    </>
                                )
                            }

                            {
                                showProductColorWise && (
                                    <>
                                        <div className="inputItem">
                                            <input
                                                type="checkbox"
                                                id="black"
                                                value="black"
                                                name="black"
                                                onChange={(e) => filterByColor("black")}
                                                selected={selectedCheckboxes.includes("black")}
                                            />
                                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'black', margin: '0px 5px 0px 1rem' }}></div>
                                            <label htmlFor="Black">Black</label>
                                        </div>

                                        <div className="inputItem">
                                            <input
                                                type="checkbox"
                                                id="blue"
                                                value="blue"
                                                name="blue"
                                                onChange={(e) => filterByColor("blue")}
                                                selected={selectedCheckboxes.includes("blue")}
                                            />
                                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'blue', margin: '0px 5px 0px 1rem' }}></div>
                                            <label htmlFor="blue">Blue</label>
                                        </div>

                                        <div className="inputItem">
                                            <input
                                                type="checkbox"
                                                id="white"
                                                value="white"
                                                name="white"
                                                onChange={(e) => filterByColor("white")}
                                                selected={selectedCheckboxes.includes("white")}
                                            />
                                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white', margin: '0px 5px 0px 1rem' }}></div>
                                            <label htmlFor="white">White</label>
                                        </div>

                                        <div className="inputItem">
                                            <input
                                                type="checkbox"
                                                id="Red"
                                                value="Red"
                                                name="Red "
                                                onChange={(e) => filterByColor("Red")}
                                                selected={selectedCheckboxes.includes("Red")}
                                            />
                                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'red', margin: '0px 5px 0px 1rem' }}></div>
                                            <label htmlFor="Red">Red</label>
                                        </div>

                                        <div className="inputItem">
                                            <input
                                                type="checkbox"
                                                id="Multicolour"
                                                value="Multi-Colour"
                                                name="Multi-Colour"
                                                onChange={(e) => filterByColor("Multi-Colour")}
                                                selected={selectedCheckboxes.includes("Multi-Colour")}
                                            />
                                            <div className="filterColor" style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#ff00e1', margin: '0px 5px 0px 1rem' }}></div>
                                            <label htmlFor="Multi-color">Multi-color</label>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            )}

            <div className="mobleft">
                <div className="sort" onClick={() => {setShowMobSortMenu(true);setShowFilterMenu(false)}}>
                    SORT BY
                </div>


                <div className="filter" onClick={() => {setShowFilterMenu(true);setShowMobSortMenu(false)}}>
                    FILTER
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Products