import { Tweet } from '../Utils/JsonClass';
import { motion, AnimatePresence } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef,} from 'react';
import { makeStyles } from '@mui/styles';
import TweetContent from './TweetContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ReactLoading from 'react-loading';
import { IconButton, Typography } from '@mui/material';

// icons
import ReplayIcon from '@mui/icons-material/Replay';
import CableIcon from '@mui/icons-material/Cable';
import CloudIcon from '@mui/icons-material/Cloud';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { GoBrowser } from 'react-icons/go';
import SettingDialog from './SettingDialog';


const useStyles = makeStyles({
    overlay: {
        // height: '5vh',
        // width: '50%',
        maxWidth: 'max-content',
        position: 'absolute',
        bottom: 30,
        left: 20,
        fontSize:15,
        fontWeight: 'bold',
        // backgroundColor: '#61dafb',
        alignItems: 'center',
        zIndex: 2000,
        padding: 0,
    },
    tile: {
        height: '4vh',
        minHeight: 36.7,
        maxHeight: '4vh',
        backgroundColor: 'rgb(183, 183, 183, 0.6)',
        borderRadius: '5px',
        margin: 0,
        width: 160,
        position: 'absolute',
        bottom: 16,
        left: 20,
        alignItems: 'center',
        zIndex: 2000,
        padding: 0,
        
    },
    loading: {
        maxHeight: '4vh',
        minHeight: 36.7,
        transform: 'rotateY(180deg)',
    },
    errorLoading: {
        maxHeight: '4vh',
    },
});

interface Props {
    wsStatus: string,
    tweetcout: number,
    tryReConnect: () => void,
}

export const Overlay = (props : Props) => {
    const classes = useStyles();

    const browserStatus = () => {
        const browser = <GoBrowser size={35} />;
        let cloud, connection = <div></div>;
        
        switch (props.wsStatus) {
            case 'Connecting':
                cloud = <CloudIcon fontSize='large' color='warning' className={classes.errorLoading} />;
                connection = <ReactLoading type={'cylon'} color={'red'} height='4vh' width='2.3vw' className={classes.errorLoading}  />;
                break;
            case 'Open':
                cloud = <CloudDoneIcon  fontSize='large' color='success' className={classes.errorLoading}/>;
                connection = <ReactLoading type={'cubes'} color={'green'} height='4vh' width='2.3vw' className={classes.loading} />;
                break;
            case 'Closed':
                cloud = <CloudOffIcon  fontSize='large' color='error' className={classes.errorLoading} />;
                connection = <ReactLoading type={'cylon'} color={'red'} height='4vh' width='2.3vw' className={classes.errorLoading} />;
                break;
        }

        return (
            <Grid container className={classes.errorLoading} alignItems={'center'} >
                <Grid container  item xs={4} justifyContent={'center'}>{browser}</Grid>
                <Grid container item xs={4} justifyContent={'center'}>{connection}</Grid>
                <Grid container item xs={4} justifyContent={'center'}>{cloud}</Grid>
            </Grid>
        )
    }
    const drawOverlay = useMemo(() => {
        return(
            // <Grid className={classes.overlay} container spacing={2} >
            //     <Grid item lg={3} className={classes.errorLoading}>
            //         <div className={classes.tile} >
            //             {browserStatus()}
            //         </div>
            //     </Grid>  
            //     <Grid item lg={3}>
                    
            //     </Grid>
            //     <Grid item lg={3}>
            //         {/* <IconButton onClick={props.tryReConnect}>
            //             <ReplayIcon />
            //         </IconButton> */}
            //     </Grid>
            // </Grid>
            <div className={classes.tile} >
                {browserStatus()}
            </div>
        )
    }, [props]);

    return(
        <Fragment>
            {drawOverlay}
        </Fragment>
    )
}
export default Overlay;