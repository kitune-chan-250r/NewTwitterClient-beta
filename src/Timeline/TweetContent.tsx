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
import ImageEntity from './ContentEntity/ImageEntity';
import { Typography } from '@mui/material';
import VideoEntity from './ContentEntity/VideoEntity';
import TwitterIcon from '@mui/icons-material/Twitter';
import { AiOutlineTwitter } from "react-icons/ai";


const useStyles = makeStyles({
    userName: {
        fontWeight: 'bold',
        fontSize: 14,
        padding: 4,
    },
    icon: {
        minWidth:35,
        maxWidth:55,
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    tweetText: {
        fontSize: 14,
        fontFamily: 'Helvetica Neue',
        paddingRight: 5,
    },
    avater: {
        marginTop: 10,
        marginBottom: 4,
        marginLeft: 4,
        marginRight: 4,
    },
    screenName: {
        fontSize: 9,
        color: 'gray'
    },
    refav: {
        fontSize: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'gray',
        padding: 2,
    },
    content: {
        // backgroundColor: '#212121',
        backgroundColor: '#15202B',
        color: '#e8e8e8',
        // outlineColor: '#cddc39',
        // maxWidth: 400,
        // minWidth: 400,
        // minWidth: 598.01,
    },
    boxborder: {
        backgroundColor: '#15202B',
        color: '#e8e8e8',
        maxWidth: 400,
        minWidth: 400,
    }
});


interface Props {
    tweet: Tweet,
    isStreamMode:boolean,
    setImageList: (imageList: string[]) => void,
    setCaroucelOpen: (isOpen: boolean) => void,
}

export const TweetContent = (props : Props) => {
    const classes = useStyles();

    return(
        <Box className={classes.content}>
            <Grid container className={classes.boxborder}>
                <Grid className={classes.icon} item xs={2}>
                    <Avatar className={classes.avater} src={props.tweet.user_avater}>N</Avatar>
                </Grid>
                <Grid item xs={10}>
                    <Grid container direction="column">
                        <Grid item xs={1}>
                            <Box className={classes.userName}>
                                {props.tweet.user_name}<a className={classes.screenName}>@{props.tweet.screen_name}</a>
                            </Box>    
                        </Grid>
                        <Grid className={classes.tweetText} item xs={11}>
                            {/* <Typography> */}
                                {props.tweet.text.split('\n').map(
                                    e  => <div>{e}<br/></div>
                                    )
                                }
                            {/* </Typography> */}
                        </Grid>
                    </Grid>
                </Grid>

                {/* { props.tweet.have_photo ? 
                    <ImageEntity sorce={props.tweet.media_src} setImageList={props.setImageList} setCaroucelOpen={props.setCaroucelOpen}/>
                    : ''
                } */}

                {
                    props.tweet.media_content.type === 'photo' ?
                    <ImageEntity sorce={props.tweet.media_content.src} isStreamMode={props.isStreamMode} setImageList={props.setImageList} setCaroucelOpen={props.setCaroucelOpen}/>
                    : ''
                }

                {
                    props.tweet.media_content.type === 'video' ?
                    <VideoEntity tweet={props.tweet}/>
                    : ''
                }



                {/* reply / retweet / fav */}
                <Grid className={classes.refav} container>
                    <Grid className={classes.refav} key={'rep'} item xs={4}>
                        <FaRegComment />
                    </Grid>
                    <Grid className={classes.refav} key={'retweet'} item xs={4}>
                        <FaRetweet color={'gray'}/><a>{props.tweet.rt_count}</a>
                    </Grid>
                    <Grid className={classes.refav} key={'fav'} item xs={3}>
                        <TiStarOutline color={'gray'}/><a>{props.tweet.fav_count}</a>
                    </Grid>
                    <Grid item xs={1}>
                        <a href={'https://twitter.com/'+props.tweet.screen_name+'/status/'+props.tweet.tweet_id} target='_blank'>
                            <AiOutlineTwitter style={{color: '#2196f3'}} />
                        </a>
                    </Grid>

                    {/* test */}
                    {/* <Grid item xs={4}>
                        <TiStarOutline color={'gray'}/><a>{props.tweet.z}</a>
                    </Grid> */}
                </Grid>
            </Grid>
        </Box>
    )
}
export default memo(TweetContent);