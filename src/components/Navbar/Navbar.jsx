import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Navbar.scss"
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";
import { ModalInFunctionalComponent } from "../../components/Modal/Modal";


const Navbar = () => {
    let showMenu = false;
    const [open, setOpen] = useState(false)
    const products = useSelector((state) => state.cart.products);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [dropdownState, setDropdownState] = useState(false);
    let user = useSelector((state) => state.user.currentUser);


    const handleDropdownClick = () => {
        setDropdownState(!dropdownState);
    }

    const signOut = () => {
        localStorage.removeItem('persist:root')
        window.location.reload(false);
    }
    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };


    const toggleMenu = () =>{
        // console.log("---", navItems && navItems)
        if(!showMenu) {
            const hamburger = document.querySelector('.menu-btn__burger');
            hamburger.classList.add('open');
            const nav = document.querySelector('.navbar');
            nav.classList.add('open');
            const wrapper = document.querySelector('.navbarWrapper');
            wrapper.classList.add('open');
            const menuNav = document.querySelector('.left');
            menuNav.classList.add('open');
            const menuNavs = document.querySelector('.right');
            menuNavs.classList.add('open');
            const navItems = document.querySelectorAll('.item');
            navItems && navItems.forEach(item => item.classList.add('open'));
            const disable = document.querySelectorAll('.items');
            disable && disable.forEach(item => item.classList.add('open'));

            showMenu = true;
          } else {
            const hamburger = document.querySelector('.menu-btn__burger');
            hamburger.classList.remove('open');
            const nav = document.querySelector('.navbar');
            nav.classList.remove('open');
            const wrapper = document.querySelector('.navbarWrapper');
            wrapper.classList.remove('open');
            const menuNav = document.querySelector('.left');
            menuNav.classList.remove('open');
            const menuNavs = document.querySelector('.right');
            menuNavs.classList.add('open');
            const navItems = document.querySelectorAll('.item');
            navItems && navItems.forEach(item => item.classList.remove('open'));
            const disable = document.querySelectorAll('.items');
            disable && disable.forEach(item => item.classList.remove('open'));
            showMenu = false;
          }
    }
    return (
        <div className='navbar'>
         
            <div className="menu-btn" onClick={toggleMenu}>
                <span className="menu-btn__burger"></span>
            </div> 

            <div className='navbarWrapper'>
                <div className='left'>
                    <div className="item items" >
                        <img src="/img/en.png" alt="" />
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="item items">
                        <span>USD</span>
                        <KeyboardArrowDownIcon />
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/men">Men</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/women">Women</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/products/children">Children</Link>
                    </div>
                </div>
                <div className='center'>
                    <Link className="link" to="/">
                        <img className='logo' src="/img/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className='right'>
                    <div className="item">
                        {/* <Link className="link" to="/">Homepage</Link> */}
                    </div>
                    <div className="item">
                        {/* <Link className="link" to="/">About</Link> */}
                    </div>
                    <div className="item">
                        {/* <Link className="link" to="/">About</Link> */}
                    </div>
                    <div className="item">
                        <Link className="link" to="/">Contact</Link>
                    </div>
                    <div className="item">
                        <Link className="link" to="/">Stores</Link>
                    </div>
                    <div className="icons">
                        <div className="item items">
                            <SearchIcon />
                            <PersonOutlineOutlinedIcon onClick={handleDropdownClick} />
                            <FavoriteBorderOutlinedIcon />

                                <div className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"}`}>
                                    {user ? (
                                        <>
                                            <div className="dropdown-item">
                                                <div className="dropdown__link"> Profile Details</div>
                                            </div>

                                            <div className="dropdown-item">
                                                <div className="dropdown__link" onClick={() => signOut()}> Sign out</div>
                                            </div>

                                            <div className="dropdown-item">
                                                <Link to="/success"> <div className="dropdown__link"> Orders </div></Link>
                                            </div>

                                        </>
                                    ) : (
                                        <>
                                            <div className="dropdown-item">
                                                <Link to="/login"><div className="dropdown__link"> Login </div></Link>
                                            </div>
                                            <div className="dropdown-item">
                                                <Link to="/register"> <div className="dropdown__link"> Register </div></Link>
                                            </div>

                                        </>
                                    )}
                                </div>
                 

                            <div className="cartIcon" onClick={() => setOpen(!open)}>
                                <ShoppingCartOutlinedIcon />
                                <span>{products.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {open && <Cart setOpen={setOpen} open={open} totalPrice={totalPrice} setModalIsOpen={setModalIsOpen} />}
            {modalIsOpen && <ModalInFunctionalComponent modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}
                price={totalPrice()} />}
        </div>
    )
}

export default Navbar