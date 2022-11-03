import { Tweet } from '../Utils/JsonClass';
import { motion, AnimatePresence, useDragControls  } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef, createRef,} from 'react';
import { makeStyles } from '@mui/styles';
import TweetContent from './TweetContent';
import DummyTweetContent from '../Login/DummyTweetContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {ImageCaroucel, Handler} from './ImageCarousel';

const useStyles = makeStyles({
    draggableArea: {
        width:'99vw',
        height:'97vh',
        maxWidth:'99vw',
        maxHeight:'97vh',
        display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // background: 'green',
        borderRadius: '10px',
    },
    tweetContainer: {
        // maxWidth: 598,
        // maxHeight: 300, 
        // minWidth: 250,
        overflow: 'clip',
        position:'absolute', 
        borderRadius:'5px',
        // outline: '0.1px solid',
        // outlineColor: '#bdbdbd',
        backgroundColor: '#15202B',
        color: '#e8e8e8',
    },
    screenName: {
        fontWeight: 'bold',
    }
});

interface Props {
    tweets: Tweet[],
    login: boolean,
    isStreamMode: boolean,
    onDrag: (index:number) => void,
    onDragEnd: (index: number) => void,
    setImageList: (imageList: string[]) => void,
    setCaroucelOpen: (isOpen: boolean) => void,
}

export const TweetBox = (props : Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const classes = useStyles();
    const [onDrag, setOndrag] = useState(0);
    const controls = useDragControls();
    const childRef = useRef({} as Handler);

    const startDrag = (event: MouseEvent, index: number) => {
        controls.start(event, { snapToCursor: true });
    };
    
    const drawTweet = useMemo(() => {
        return(
            <div id={'draggable-area'} className={classes.draggableArea} ref={ref}>
                {/* {onDrag} */}
                <AnimatePresence initial={false}>
                    {props.tweets.map((tweet, index) => {
                        return(
                            <motion.div
                                className={classes.tweetContainer}
                                style={{
                                    top:tweet.y, 
                                    left:tweet.x, 
                                    zIndex: tweet.z,
                                }}//tweet.tweet_id==onDrag? 10 : 0
                                // component={motion.div}
                                animate={{ scale:1.1, boxShadow: "-2px 0px 23px -5px rgba(0,0,0,0.6)", }}//
                                transition={{ duration: 0.5 }}
                                drag
                                dragConstraints={ref}
                                key={tweet.tweet_id}
                                // onDrag={()=>{props.onDrag(index)}}
                                // onClick={()=>{props.onDrag(index)}}
                                // onDragEnd={()=>{props.onDragEnd(0)}}
                                // onTap={()=>{props.onDrag(index)}}
                                dragControls={controls}
                                onPointerDown={() => props.onDrag(index)}
                                onPointerUp={() => props.onDrag(index)}
                            >
                                {/* <TweetContent tweet={tweet} setImageList={props.setImageList} setCaroucelOpen={props.setCaroucelOpen}/> */}
                                { props.login ?
                                    <TweetContent tweet={tweet} isStreamMode={props.isStreamMode} setImageList={props.setImageList} setCaroucelOpen={props.setCaroucelOpen}/>
                                    :
                                    <DummyTweetContent tweet={tweet}/>
                                }
                                
                                {/* <ImageCaroucel ref={childRef} sorce={tweet.media_src}/> */}
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        )
    }, [props.tweets]);

    return(
        <Fragment>
            {drawTweet}
        </Fragment>
    )
}
export default TweetBox;