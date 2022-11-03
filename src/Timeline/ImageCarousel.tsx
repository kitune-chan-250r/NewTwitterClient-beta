/* eslint-disable jsx-a11y/alt-text */
import { Tweet } from '../Utils/JsonClass';
import { motion, AnimatePresence } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef, forwardRef, useImperativeHandle, BaseSyntheticEvent } from 'react';
import { makeStyles } from '@mui/styles';
import TweetContent from './TweetContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'react-material-ui-carousel';
import { Dialog, DialogContent } from '@mui/material';

const useStyles = makeStyles({
    carousel: {
        // position: 'absolute',
        // minWidth: '60%',
        // minHeight: '60%',
        // maxWidth: '60%',
        // maxHeight: '60%',
    },
    contentBox:{
        display: 'flex', 
        maxHeight: '30%',
        margin: '0 auto',
    },
    content: {
        display: 'block', 
        objectFit: 'contain', 
        maxHeight: '80vh',
        maxWidth: '80vw',
        margin: '0 auto',
    },
    dialog: {
        // minHeight: '80%',
        // maxHeight: '80%',
        minWidth: '80%',
        maxWidth: '80%',
        // backgroundColor: 'red',
        // opacity: 1,
        // background: 'rgba(0, 0, 0, 0)',
    },
    dialogContent: {
        // opacity: 0,
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0)',
    }
});

interface Props {
    sorce: string[],
    isCarouselOpen: boolean,
    setCaroucelOpen: (isOpen: boolean) => void,
}

export interface Handler {
    open(): void;
}

export const ImageCaroucel : React.ForwardRefRenderFunction<Handler, Props> = (props, ref) => {
    const classes = useStyles();

    // 画像以外をクリックした場合はダイアログ内でもカルーセルを閉じる
    const closeCarousel = ( event:BaseSyntheticEvent ) => {
        // console.info(event.target.localName);
        if (event.target.localName !== 'img') {
            props.setCaroucelOpen(false);
        }  
    }

    const drawImageCarouselDialog = useMemo(() => {
        return(
            <Dialog
                // open={props.sorce.length !== 0 ? true : false}
                open={props.isCarouselOpen}
                PaperProps={{sx: {background: 'rgba(0, 0, 0, 0)'}}}
                onClose={() => props.setCaroucelOpen(false)}
                // fullWidth={true}
                // maxWidth={false}
                classes={{ paper:classes.dialog }}
            >
                <DialogContent className={classes.dialogContent} onClick={closeCarousel} >
                        <Carousel
                            // className={classes.carousel}
                            autoPlay={false}
                            animation={'slide'}
                            navButtonsAlwaysVisible={true}
                            indicators={false}
                        >
                            {props.sorce.map(img => 
                                <div
                                    className={classes.contentBox}
                                    onClick={closeCarousel}
                                >
                                    <img 
                                        className={classes.content}
                                        key={img.toLowerCase()}
                                        src={img}
                                    />
                                </div>
                            )}
                        </Carousel>
                </DialogContent>
            </Dialog>
        )
    }, [props.isCarouselOpen]);

    return(
        <Fragment>
            {drawImageCarouselDialog}
        </Fragment>
    )
}

export default forwardRef(ImageCaroucel);