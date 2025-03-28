import React, {useState} from 'react';
import './navbar.css'
import Logo from '../../assets/img/navbar-logo.svg'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";
import {getFiles, searchFiles} from "../../actions/file";
import {showLoader} from "../../reducers/appReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function searchChangeHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)               
        }
        dispatch(showLoader())
        if(e.target.value !== ''){
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div className="navbar">
            <div className="container">
                <img src={Logo} alt="" className="navbar__logo"/>
                {isAuth && <input
                    value={searchName}
                    onChange={(e) => searchChangeHandler(e)}
                    className="navbar__search"
                    type="text"
                    placeholder="Search"/>}
                {!isAuth && <div className="navbar__login"><NavLink to="/login">Login</NavLink></div>}
                {!isAuth &&
                    <div className="navbar__registration"><NavLink to="/registration">Registration</NavLink></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout())}>Logout</div>}
            </div>
        </div>
    );
};

export default Navbar;