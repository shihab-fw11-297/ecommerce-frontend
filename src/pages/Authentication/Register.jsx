import './Register.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initState = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    address: ""
}

const Register = () => {
    const [userData, setUserData] = useState(initState);
    const [signuperror, setSignUpError] = useState(false);
    const [emptyFeildError, setEmptyFieldError] = useState(false);
    let navigate = useNavigate();

    const handleInput = (e) => {
        let { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }


    const normalSignUp = (e) => {

        e.preventDefault();
        if (!userData.fname || !userData.lname || !userData.username || !userData.email || !userData.password) {
            setEmptyFieldError(true)
            // emptyData()
        } else {
            axios.post(`https://ecommerce-service.onrender.com/api/auth/register`, userData).then(res => {
                setSignUpError(false)
                emptyData()
                navigate("/login");
            }).catch(function (e) {
                setSignUpError(true)
                emptyData()
            })
        }
    }

    const emptyData = () => {
        setUserData({
            fname: "",
            lname: "",
            username: "",
            email: "",
            password: "",
            address: ""
        })
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="registerWrapper">
                    <h1 className="title">CREATE AN ACCOUNT</h1>
                    <form action="" className="forms">
                        <input type="text" onChange={handleInput} name="fname" placeholder="Enter First name" value={userData.fname} />
                        <input type="text" onChange={handleInput} name="lname" placeholder="Enter Last name" value={userData.lname} />
                        <input type="text" onChange={handleInput} name="username" placeholder="Enter Username" value={userData.username} />
                        <input type="email" onChange={handleInput} name="email" placeholder="Enter Email" value={userData.email} />
                        <input type="password" onChange={handleInput} name="password" placeholder="Enter Password" value={userData.password} />
                        <input type="text" onChange={handleInput} name="address" placeholder="Enter Address" value={userData.address} />
                        <span className="aggrement">By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b></span>
                        <div className="center">
                            <button onClick={normalSignUp}>CREATE</button>
                        </div>
                    </form>
                    <p className="alredyregister">If you are Alredy Registerd Then <b><Link to="/login">Click Here</Link></b></p>
                    {signuperror ? <p className="AlreadyRegister">you are Already registered , please go to login</p> : ""}
                    {emptyFeildError ? <p className="AlreadyRegister">please enter all details</p> : ""}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register