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

const useStyles = makeStyles({
    overlay: {
        
    },
});

interface Props {
    sorce: string[],
    isStreamMode: boolean,
    setImageList: (imageList: string[]) => void,
    setCaroucelOpen: (isOpen: boolean) => void,
}

export const ImageEntity = (props : Props) => {
    const classes = useStyles();

    const onImageClick = (src: string) => {
        props.setImageList(props.sorce);
        props.setCaroucelOpen(true);
    }

    const drawTweet = useMemo(() => {
        return(
            props.sorce.length === 1 ? 
                <img
                    src={props.sorce[0]}
                    style={{
                        width: '100%',
                        height: '220px',
                        objectFit: 'cover',
                        filter: props.isStreamMode ? 'blur(6px)' : ''
                    }}
                    // onClick={() => onImageClick()}
                    // onClick={() => console.info('single click')}
                    onDoubleClick={() => onImageClick(props.sorce[0])}
                />
                :
                <ImageList sx={{
                    width:'100%', 
                    height:'50%', 
                    // maxHeight: 220, 
                    // overflow: 'hidden'
                    }}
                >
                    {props.sorce.map(src => (
                        <ImageListItem>
                            <img
                                src={src}
                                key={src.toLowerCase()}
                                style={{
                                    width: '100%',
                                    height: '180px',
                                    objectFit: 'cover',
                                    filter: props.isStreamMode ? 'blur(6px)' : ''
                                }}
                                // onClick={() => onImageClick()}
                                // onClick={() => console.info('single click')}
                                onDoubleClick={() => onImageClick(src)}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
        )
    }, [props.sorce, props.isStreamMode]);

    return(
        <Fragment>
            {drawTweet}
            {/* <ImageCaroucel sorce={props.sorce}/> */}
        </Fragment>
    )
}
export default ImageEntity;