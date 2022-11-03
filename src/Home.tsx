import React, {Fragment, useEffect, useState, useMemo} from 'react';
import { AppBar, Container, Toolbar, Box, IconButton, Tooltip, Avatar, Menu } from '@mui/material';
import { Typography, MenuItem } from '@mui/material';
import TwitterOAuth from './Login/TwitterOAuth';
import Client from './Timeline/Client';
import axios from 'axios';
import ReactGA from 'react-ga4';

//base
export const Home = () => {
    const [login, setLogin] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    // google analytics
    const TRACKING_ID = "G-X4PFC370GN";
    ReactGA.initialize(TRACKING_ID);

    useEffect(() => {
        document.cookie.includes("session_id") ? setLogin(true) : setLogin(false);
        ReactGA.send("pageview");
    }, [login])

    const logout = async() => {
        await axios.get('http://localhost:8080/logout', { withCredentials: true })
             .then(request => {
                 setLogin(false);
                console.info("logout");
             })
             .catch(err => {
                 console.info(err);
             })
    }

    return(
        <Fragment>
    
            { login?
                <Client login={login} />
                :
                <TwitterOAuth login={login} />
            }
        </Fragment>
    )
}

export default Home;