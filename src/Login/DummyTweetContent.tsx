import { Tweet } from '../Utils/JsonClass';
import { motion, AnimatePresence } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef, memo } from 'react';
import Paper from '@mui/material/Paper';
import { maxHeight } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import { FaRetweet, FaRegComment } from 'react-icons/fa';
import { TiStarOutline } from "react-icons/ti";
import Skeleton from '@mui/material/Skeleton';


const useStyles = makeStyles({
    dummyUserName: {
        fontWeight: 'bold',
        fontSize: 14,
        padding: 4,
    },
    dummyIcon: {
        minWidth:35,
        maxWidth:55,
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    dummyTweetText: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        margin: 10,
        paddingBottom: 5,
    },
    dummyAvater: {
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
    },
    dummyScreenName: {
        fontSize: 9,
        color: 'gray'
    },
    dummyRefav: {
        fontSize: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gray',
        padding: 2,
    },
    dummyPaper: {
        // backgroundColor: '#212121',
        backgroundColor: '#15202B',
        color: '#e8e8e8',
        // outlineColor: '#cddc39',
        maxWidth: 400,
        minWidth: 400,
        // minWidth: 598.01,
    },
    dummyBoxborder: {
        backgroundColor: '#15202B',
        color: '#e8e8e8',
        // outlineColor: '#cddc39',
        maxWidth: 400,
        minWidth: 400,
    }
});


interface Props {
    tweet: Tweet,
}

export const DummyTweetContent = (props : Props) => {
    const classes = useStyles();
    const heightSet = [160, 30, 60, 30, 200, 80, 45, 35, 100, 130];
    const randomHeight = Math.floor(Math.random() * 10);
    // console.info(heightSet[randomHeight]);

    return(
        <Box className={classes.dummyPaper}>
            <Grid container className={classes.dummyBoxborder}>
                <Grid className={classes.dummyIcon} item xs={2}>
                    {/* <Avatar className={classes.dummyAvater} src={props.tweet.user_avater}>N</Avatar> */}
                    <Skeleton animation="wave" variant="circular" width={35} height={35} className={classes.dummyAvater} sx={{ bgcolor: 'grey.800' }} />
                </Grid>
                <Grid item xs={10}>
                    <Grid container direction="column">
                        <Grid item xs={1}>
                            <Box className={classes.dummyUserName}>
                                {/* {props.tweet.user_name}<a className={classes.dummyScreenName}>@{props.tweet.screen_name}</a> */}
                                <Skeleton animation="wave" width={200} height={20} sx={{ bgcolor: 'grey.800' }} />
                            </Box>    
                        </Grid>
                        <Grid className={classes.dummyTweetText} item xs={11}>
                            {/* {props.tweet.text} */}
                            <Skeleton animation="wave" variant="rectangular" width={320} height={heightSet[randomHeight]} sx={{ bgcolor: 'grey.800' }} />
                        </Grid>
                    </Grid>
                </Grid>

                { props.tweet.have_photo ? 
                    // <ImageEntity sorce={props.tweet.media_src} setImageList={props.setImageList} setCaroucelOpen={props.setCaroucelOpen}/>
                    <></>
                    : ''
                }

                {/* reply / retweet / fav */}
                <Grid className={classes.dummyRefav} container>
                    {/* <Grid className={classes.refav} key={'rep'} item xs={4}>
                        <FaRegComment />
                    </Grid>
                    <Grid className={classes.refav} key={'retweet'} item xs={4}>
                        <FaRetweet color={'gray'}/><a>{props.tweet.rt_count}</a>
                    </Grid>
                    <Grid className={classes.refav} key={'fav'} item xs={4}>
                        <TiStarOutline color={'gray'}/><a>{props.tweet.fav_count}</a>
                    </Grid> */}

                    {/* test */}
                    {/* <Grid item xs={4}>
                        <TiStarOutline color={'gray'}/><a>{props.tweet.z}</a>
                    </Grid> */}
                </Grid>
            </Grid>
        </Box>
    )
}
export default memo(DummyTweetContent);