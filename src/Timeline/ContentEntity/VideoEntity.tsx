/* eslint-disable jsx-a11y/alt-text */
import { Tweet } from '../../Utils/JsonClass';
import { motion, AnimatePresence } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef,} from 'react';
import { makeStyles } from '@mui/styles';
import TweetContent from '../TweetContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageCaroucel } from '../ImageCarousel';
import ReactPlayer from 'react-player';

const useStyles = makeStyles({
    overlay: {
        
    },
});

interface Props {
    tweet: Tweet,
}

export const VideoEntity = (props : Props) => {
    const classes = useStyles();
    const [play, setPlay] = useState(false);

    // const onImageClick = () => {
        
    // }

    // const drawVideo = useMemo(() => {
    //     console.info(props.tweet.media_content.src[0]);
    //     return(
    //         // props.tweet.media_content.src.length === 1 ? 
    //             <ReactPlayer 
    //                 url={props.tweet.media_content.src[0]}
    //                 controls={true}
    //                 light={props.tweet.media_content.preview}
    //                 // light={true}
    //                 muted={true}
    //             />
    //             // :
    //             // <ReactPlayer 
    //             //     url={props.tweet.media_content.src[0]}
    //             //     controls={true}
    //             //     light={props.tweet.media_content.preview}
    //             //     muted={true}
    //             // />
    //     )
    // }, [props.tweet.media_content.src[0]]);

    return(
        <Fragment>
            {/* <ReactPlayer 
                url={props.tweet.media_content.src[0]}
                controls={true}
                light={props.tweet.media_content.preview}
                // light={true}
                muted={true}
                onPlay={() => console.info(props.tweet.media_content.src[0])}
                playing={play}
                onClickPreview={() => console.info(props.tweet.media_content.src[0])}
                // stopOnUnmount={false}
                onReady={() => setPlay(true)}
                playsinline={true}
                config={{
                    file: { 
                      attributes: { 
                        preload: 'metadata' 
                      } 
                    } 
                }}
            /> */}

            {
                props.tweet.media_content.src[0].includes('.m3u8') ? // .m3u8の場合はvideoタグで再生できない？
                <ReactPlayer 
                    url={props.tweet.media_content.src[0]}
                    controls={true}
                    light={props.tweet.media_content.preview}
                    width='100%'
                    // height='100%'
                    volume={0.4}
                    // light={true}
                    muted={true}
                    onPlay={() => console.info(props.tweet.media_content.src[0])}
                    playing={play}
                    onClickPreview={() => console.info(props.tweet.media_content.src[0])}
                    // stopOnUnmount={false}
                    // onReady={() => setPlay(true)}
                    playsinline={true}
                    config={{
                        file: { 
                            attributes: { 
                                preload: 'metadata',
                                poster: props.tweet.media_content.preview,
                                // innerHeight: 220,
                            }
                        }
                    }}
                    height={220}
                    // innerHeight={220}
                    // style={{
                    //     // height: 440,
                    //     // maxHeight: 400,
                    //     // borderRadius: 4,
                    // }}
                />
                :
                <video src={props.tweet.media_content.src[0]} 
                    controls={true} 
                    muted={true} 
                    width={'100%'} 
                    style={{maxHeight: 400}} 
                    preload={'metadata'} 
                    playsInline={true} 
                    poster={props.tweet.media_content.preview} 
                    onStalled={() => console.info("load data stalled...")}
                    // onPlay={(videoElement, event) => {videoElement.volume = 0.5}}
                    // onVolumeChange={(videoElement, event) => {videoElement.volume = 0.5}}
                />
            }
            
            {/* {props.tweet.media_content.src[0]} */}
        </Fragment>
    )
}
export default VideoEntity;