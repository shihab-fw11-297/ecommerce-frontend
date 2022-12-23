import './Register.scss'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, isLogin } = useSelector((state) => state.user);
    let navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="loginWrapper">
                    <h1 className="title">SIGN IN</h1>
                    <form action="" className="forms">
                        <div className="flexColumn">
                            <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                            <div className="center">
                                <button onClick={handleClick} style={{ marginTop: '5%' }} disabled={isFetching}>Login</button>
                            </div>
                            {error ? <p className="error">Something went wrong...</p> : ""}
                            <p className="alredyregister">If you are Not Registerd Then <b><Link to="/register">Click Here</Link></b></p>
                            {/* <p className="link"></p> */}
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Login;