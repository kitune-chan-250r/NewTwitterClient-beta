import React, {Fragment, useEffect, useState, useMemo} from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { MediaContent, Settings, Tweet } from '../Utils/JsonClass';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import TweetBox from './TweetBox';
import TweetContent from './TweetContent';
import TwitterOAuth from '../Login/TwitterOAuth';
import Overlay from './Overlay';


import axios from 'axios';
import { makeStyles } from '@mui/styles';
import ImageCaroucel from './ImageCarousel';

import ReactGA from 'react-ga4';
import SettingDialog from './SettingDialog';
import { BASE_WS_URL, DEFAULT_VALUE } from '../Utils/Type';

const useStyles = makeStyles({
    leftsidebar: {
        height: '100%',
        // backgroundColor: 'red',
        // maxWidth: 200,
        minWidth: 200,
    },
    container: {
        height: '100vh',
        width: '100wh',
        // backgroundColor: '#757575', //'#1a1d24',
    },
    rightsidebar: {
        // maxWidth: 350,
        minWidth: 350,
        // height: '100vh',
        backgroundColor: 'red',
    },
    main: {
        width: "100%",
        height: "100%",
    }

});

interface Props {
    login: boolean,
}

//base
export const Client = (props: Props) => {
    const [responseTweet, setTweet] = useState('');
    const [webSocketState, setWebSocketState] = useState('');
    const [socketUrl, setSocketUrl] = useState(BASE_WS_URL);
    const [timeline, setTimeline] = useState([] as Tweet[]);
    const [imageList, setImageList] = useState([] as string[]);
    const [isCaroucelOpen, setCaroucelOpen] = useState(false);
    const [settings, setSettings] = useState({} as Settings);
    const [maxDipsTweet, setMaxDispTweet] = useState(DEFAULT_VALUE.MAX_DISP_TWEET);
    const [background, setBackground] = useState(DEFAULT_VALUE.BACKGROUND_COLOR);
    const [isStreamMode, setStreamMode] = useState(DEFAULT_VALUE.STREAM_MODE);

    // google analytics
    const TRACKING_ID = "G-X4PFC370GN";
    ReactGA.initialize(TRACKING_ID);
    // const ref = useRef<HTMLDivElement>(null);ws://localhost:8080/test
    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(socketUrl, {  
            onMessage: (message) => handleRecieveMessage(message),
            shouldReconnect: (closeEvent) => true,
            reconnectInterval: 20000,
            retryOnError: true,
            // 鯖に認証情報なし、ws切断済みの場合は再接続無限ループになるので一定回数失敗したら再認証の流れにする
        });//ws://localhost:8080/test?act=actsample?ast=astsample


    // useEffect(() => {
    //     // websocket接続前にapiで認証情報の有無を確認
    //     const checkToken = async() => {
    //         console.info('start check token');
    //         await axios.get('http://localhost:8080/isTokenEnable', { withCredentials: true })
    //              .then(request => {
    //                 setSocketUrl('ws://localhost:8080/test');
    //              })
    //              .catch(err => {
    //                 setSocketUrl('');
    //                 window.location.reload();
    //                 console.info(err);
    //              })
    //     }
    //     checkToken();
    // }, []);

    // ウェブソケットの接続状況
    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];
    // let connectionStatus = 'testing';
    const classes = useStyles();
    const MAX_DISP_TWEET = 120;
    const FRONT_TWEET_Z_NUMBER = MAX_DISP_TWEET + 10;
    const FRONT_Z = 10;

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
        ReactGA.event("timeline_connecting");
        const onResize = () => {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // 初期処理
    useEffect(() => {
        initSetting();
    }, []);

    useEffect(() => {
        if (maxDipsTweet < timeline.length) {
            timeline.splice(0, timeline.length - maxDipsTweet - 1);
        }
    }, [maxDipsTweet]);

    //座標をランダムに設定する、
    const randomTop = ():number => {
        return Math.floor(Math.random() * (windowDimensions.height - 200));
    }

    const randomLeft = ():number => {
        return Math.floor(Math.random() * (windowDimensions.width - 260));
    }
    
    // ローカルストレージから設定を読み込む
    const initSetting = () => {
        const localMaxDispTweet = localStorage.getItem('maxDispTweet');
        if (localMaxDispTweet !== null) 
            setMaxDispTweet(Number(localMaxDispTweet));

        const localBackground = localStorage.getItem('backgroundColor');
        setBackground(localBackground || DEFAULT_VALUE.BACKGROUND_COLOR);

        const localIsStreamMode = localStorage.getItem('isStreamMode');
        const isStreamMode = localIsStreamMode || DEFAULT_VALUE.STREAM_MODE;
        setStreamMode(JSON.parse(isStreamMode.toString()));
    }
    
    // ツイートコンテンツのドラッグ開始時
    const ontweetdrag = (index:number) => {
        // copylist.filter(e => e.z >= FRONT_TWEET_Z_NUMBER).forEach(e => e.z = timeline.length);
        let copylist = [...timeline];
        // 従来のアルゴリズム
        // copylist.filter(e => e.z >= FRONT_TWEET_Z_NUMBER).forEach(e => e.z -= 1);
        // copylist[index].z = FRONT_TWEET_Z_NUMBER;

        // 新アルゴリズム
        copylist.filter(e => e.z >= timeline.length + FRONT_Z).forEach(e => e.z -= 1);
        copylist[index].z = timeline.length + FRONT_Z;
        setTimeline(copylist);
    }

    // ツイートコンテンツのドラッグ終了時
    const ontweetdragend = (index:number) => {
        let copylist = [...timeline];
        copylist[index].z = 0;
        setTimeline(copylist);
    }

    //websocketでツイートを受信したときの処理
    const handleRecieveMessage = (message: MessageEvent) => {
        let copyList = [...timeline];
        const tweet = parseTweet(message.data);
        const tweetList = copyList.map(t=> t.tweet_id);
        
        // 同じTweetIDのツイートは何個も表示しないようにしてみる
        if (!(tweetList.includes(tweet.tweet_id))){
            // 画面にツイートが最大数表示されている場合の処理
            if(copyList.length >= maxDipsTweet){
                copyList.shift(); 
                copyList.forEach(e => e.z -= 1);
            }
            copyList.push(tweet);
            setTimeline(copyList);
        }
        
        // console.log(message);
    }

    // jsonをパースしてTweetクラスにする
    const parseTweet = (str:string):Tweet => {
        const payload = new Tweet();
        const json = JSON.parse(str);

        payload.tweet_id = json.tweet_id;
        payload.user_id = json.user_id;
        payload.screen_name = json.screen_name;
        payload.text = json.text;
        payload.user_avater = json.user_avater;
        payload.user_name = json.user_name;
        payload.fav_count = json.fav_count;
        payload.rt_count = json.rt_count;
        payload.have_photo = json.havePhoto;
        payload.media_content = json.media_content as MediaContent;
        
        payload.x = randomLeft();
        payload.y = randomTop();
        payload.z = timeline.length;
        if(json.havePhoto === true){
            payload.media_src = json.photo;
            // console.log(json);
        }

        // console.info(json);
        // console.info(json.media_content);
        // if ()
        
        return payload;
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

        console.info('x = ' + payload.x);
        console.info('y = ' + payload.y);

        let copyList = [...timeline];
        copyList.push(payload);
        setTimeline(copyList);
        console.log('insert dummy data' + count);
    }

    return(
        <Fragment>
            {/* {maxDipsTweet}:{timeline.length}:{socketUrl} */}
            <Grid container className={classes.container} style={{backgroundColor: background || DEFAULT_VALUE.BACKGROUND_COLOR}}>
                <SettingDialog 
                    setMaxDispTweet={setMaxDispTweet} 
                    localMaxDispTweet={maxDipsTweet} 
                    setSocketUrl={setSocketUrl} 
                    setBackGround={setBackground} 
                    background={background}
                    setStreamMode={setStreamMode}
                    isStreamMode={isStreamMode}
                />
                <TweetBox 
                    tweets={timeline} 
                    login={props.login}
                    isStreamMode={isStreamMode}
                    onDrag={ontweetdrag} 
                    onDragEnd={ontweetdragend} 
                    setImageList={setImageList} 
                    setCaroucelOpen={setCaroucelOpen} 
                />
                <ImageCaroucel sorce={imageList} isCarouselOpen={isCaroucelOpen} setCaroucelOpen={setCaroucelOpen}/>
                <Overlay wsStatus={connectionStatus} tweetcout={timeline.length} tryReConnect={testInsertDummy} />
            </Grid>
        </Fragment>
    )
}

export default Client;