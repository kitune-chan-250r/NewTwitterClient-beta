import React, {Fragment, useEffect, useState, useMemo} from 'react';
import axios from 'axios';
import { Tweet } from '../Utils/JsonClass';
import Button from '@mui/material/Button';
import TweetBox from '../Timeline/TweetBox';
import Overlay from '../Timeline/Overlay';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Box, Dialog, DialogContent, Typography  } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import ReactGA from 'react-ga4';

const useStyles = makeStyles({
    loginContainer: {
        height: '100vh',
        width: '100vw',
        backgroundColor: '#757575', //'#1a1d24',
    },
    dialog: {
        height: '25%',
        width: '25%',
        minWidth: '436px',
        // backgroundColor: '#202124',
        // backgroundColor: 'red',
        borderRadius: 0,
    },
    dialogContent: {
        // textAlign: 'center',
        // background: 'rgba(0, 0, 0, 0)',
        // backgroundColor: 'rgb(183, 183, 183)',
        borderRadius: 0,
        // backgroundColor: 'red',
        // color: '#202124',
        color: '#ffffff',
        // boxShadow: "0px 0px 50px 26px rgba(0,0,0,0.6)",
    },
    content: {
        // backgroundColor: 'rgb(183, 183, 183)',
    },
    top: {
        // height: 400,
        minHeight: 100,
        width: '100%',
        // height: 400,
        // width: 300,
        // backgroundColor: 'red',
    },
    bottom: {

    },
    button: {
        width: 200,
    }
});

interface Props {
    login: boolean,
}

//base
export const TwitterOAuth = (props: Props) => {
    const classes = useStyles();
    const [timeline, setTimeline] = useState([] as Tweet[]);
    const [imageList, setImageList] = useState([] as string[]);
    const [isCaroucelOpen, setCaroucelOpen] = useState(false);
    const MAX_DISP_TWEET = 40;
    const FRONT_TWEET_Z_NUMBER = MAX_DISP_TWEET + 10;
    const FRONT_Z = 10;

    const TRACKING_ID = "G-X4PFC370GN";
    ReactGA.initialize(TRACKING_ID);

    //画面サイズ
    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        // 画面がリサイズされたときは表示領域を同様にリサイズする
        const onResize = () => {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // useEffect(() => {
    //     testInsertDummy();
    // }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            testInsertDummy();
        }, (Math.random() * 5) * 1000);
        return () => {
            clearInterval(timer);
        };
    }, [timeline]);

    //座標をランダムに設定する、
    const randomTop = ():number => {
        return Math.floor(Math.random() * (windowDimensions.height - 200));
    }

    const randomLeft = ():number => {
        return Math.floor(Math.random() * (windowDimensions.width - 260));
    }

    // テスト　ダミーデータ挿入
    const testInsertDummy = () => {
        let count = Math.random();
        const payload = new Tweet();
        payload.tweet_id = count;
        payload.user_id = count;
        payload.screen_name = 'dummy' + count;
        payload.text = 'dummy text ' + count;
        payload.user_avater = '';
        payload.user_name = 'dummyUser' + count;

        payload.x = randomLeft();
        payload.y = randomTop();

        let copyList = [...timeline];
        if(copyList.length >= MAX_DISP_TWEET){
            copyList.shift(); 
            // copyList.forEach(e => e.z -= 1);
        }
        copyList.push(payload);
        setTimeline(copyList);
        // console.log('insert dummy data' + copyList.length);
    }

    // const drawBackGround = useMemo(() => {
    //     return(
    //         <Fragment>
    //             <Grid container className={classes.loginContainer}>
    //                 <Overlay wsStatus={'Connecting'} tweetcout={timeline.length} tryReConnect={()=>{return;}} />
    //                 <TweetBox 
    //                     tweets={timeline} 
    //                     login={props.login} 
    //                     onDrag={()=>{return;}} 
    //                     onDragEnd={()=>{return;}} 
    //                     setImageList={setImageList} 
    //                     setCaroucelOpen={setCaroucelOpen}
    //                 />
    //             </Grid>
    //         </Fragment>
    //     )
    // }, [props.login, timeline])

    const drawLoginDialog = useMemo(() => {
        return (
            // <Fragment>
            //     <Button variant="outlined" href='http://localhost:8080/request_token'>Login?</Button>
            // </Fragment>
            <Dialog open={true} classes={{ paper:classes.dialog }}
                PaperProps={{style: { 
                    borderRadius: 0,
                    backgroundColor: 'rgb(183, 183, 183, 0.0)',
                    border: 'solid 2px #ffffff',
                    boxShadow: "0px 0px 50px 15px rgba(0,0,0,0.6)",
                }}}
            >
                <DialogContent className={classes.dialogContent}>
                    <Grid container alignContent={'center'} justifyContent={'center'}>
                        <Grid item xs={1}>

                        </Grid>
                        <Grid item xs={10} container alignContent={'center'} justifyContent={'center'} >
                            <Box className={classes.top}>
                                <Typography fontSize={22} fontWeight={400}>Connecting your Twitter account</Typography>
                            </Box>
                            <Box className={classes.bottom}>
                                <Button 
                                    variant="contained" 
                                    startIcon={<TwitterIcon />}
                                    className={classes.button}
                                    href='https://newtwitterclient.azurewebsites.net/request_token'
                                    onClick={() => ReactGA.event("start_token_request")}
                                >
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={1} >
                            
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        )
    }, []);

    return(
        <Fragment>
            {drawLoginDialog}
            <Grid container className={classes.loginContainer}>
                <Overlay wsStatus={'Connecting'} tweetcout={timeline.length} tryReConnect={()=>{return;}} />
                <TweetBox 
                    tweets={timeline} 
                    login={props.login} 
                    isStreamMode={false}
                    onDrag={()=>{return;}} 
                    onDragEnd={()=>{return;}} 
                    setImageList={setImageList} 
                    setCaroucelOpen={setCaroucelOpen}
                />
            </Grid>
        </Fragment>
    )
}

export default TwitterOAuth;