import { Settings, Tweet } from '../Utils/JsonClass';
import { motion, useCycle } from "framer-motion";
import React, {Fragment, useEffect, useState, useCallback, useMemo, useRef, memo } from 'react';
import { makeStyles } from '@mui/styles';
import TweetContent from './TweetContent';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Carousel from 'react-material-ui-carousel';
import TextField from '@mui/material/TextField';
import TagIcon from '@mui/icons-material/Tag';
import HelpIcon from '@mui/icons-material/Help';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Button, ButtonGroup, Checkbox, Dialog, DialogContent, Divider, FormControl, FormControlLabel, FormGroup, Slider, Tooltip, Typography } from '@mui/material';
import { BASE_WS_URL, DEFAULT_VALUE } from '../Utils/Type';

const useStyles = makeStyles({
    dialog: {
        height: '80%',
        maxHeight: '800px',
        // 反転しているので上から並べたいのであればbottomを指定する
        position: 'absolute',
        bottom: '8%',
        width: 300,
        textAlign:'center',
        transform: 'rotate(180deg)',
        overflow: 'auto',
        // overflowInline: 'scroll',
    },
    dialogContent: {
        // overflowY: 'scroll',
        // height: '100%',
        // minHeight: '600px',
        // maxHeight: '600px',
    },
    background: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 300,
        backgroundColor: 'rgb(183, 183, 183, 0.9)',
    },
    button: {
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'absolute',
        top: 12,
        left: 55,
        width: 50,
        height: 50,
        borderRadius: '50%',
        background: 'transparent',
        zIndex: 10000,
    },
    settingContainer: {
        zIndex: 1900,
        transform: 'rotate(180deg)',
    },
    title: {
        textAlign: 'center',
        width: '100%',
        fontSize: 25,
        // marginBottom: 30,
        marginBottom: '30%'
    },
    timeline: {
        width: '100%',
        fontSize: 18,
        // maxHeight: 21,
        // marginBottom: 30,
    },
    hashtag: {
        width: '100%',
        fontSize: 18,
        // marginBottom: 45,
        marginBottom: '15%'
    },
    subTimeline: {
        width: '100%',
        fontSize: 15,
        // marginBottom: 45,
        marginBottom: '15%'
    },
    timeLineBackGround: {
        width: '100%',
        fontSize: 18,
        // marginBottom: 45,
        marginBottom: '10%'
    },
    applyButton: {
        width: '100%',
        // height: '100%',
        fontSize: 15,
        textAlign: 'center',
        // alignItems: 'end',
        position: 'absolute',
        top: '8%',
        transform: 'rotate(180deg)',
    }
});

interface Props {
    setMaxDispTweet: (tweets: number) => void,
    localMaxDispTweet: number,
    setSocketUrl: (url: string) => void,
    setBackGround: (hex: string) => void,
    background: string,
    setStreamMode: (isStreamMode: boolean) => void,
    isStreamMode: boolean,
}

const sidebar = {
    open: (height = 1080) => ({
        clipPath: `circle(${height + 200}px at 80px 33px)`,
        transition: {
            type: "spring",
            stiffness: 60,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(25px at 80px 33px)",
        // clipPath: "circle(25px at 100% 100%)",
        transition: {
            delay: 0.1,
            type: "spring",
            stiffness: 500,
            damping: 40
        }
    }
};

export const SettingDialog = (props : Props) => {
    const classes = useStyles();
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const [hashtag, setHashtag] = useState('');
    const [maxDispTweet, setMaxDispTweet] = useState(DEFAULT_VALUE.MAX_DISP_TWEET);
    const [filterLevel, setFilterLevel] = useState('low');

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
        setMaxDispTweet(props.localMaxDispTweet);
    }, [props.localMaxDispTweet]);

    // useEffect(() => {
    //     isOpen ? getWindowDimensions() : confirmChangeSetting();
    // }, [isOpen]);

    const handleHashtagOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHashtag(event.target.value);
    };

    const handleBackgroundOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setBackGround(event.target.value.trim());
    };

    const handleClickSetting = () => {
        toggleOpen();
        !isOpen ? getWindowDimensions() : confirmChangeSetting();
        
    }

    const confirmChangeSetting = () => {
        let params = '';
        if (filterLevel != 'low') 
            params += 'filterLevel=' + filterLevel + '&';
        
        if (hashtag.trim() != '')
            params += 'hashTag=' + hashtag.replace(/\#|\?|\:|\\/g, '');

        // ローカルストレージに保存
        localStorage.setItem('maxDispTweet', maxDispTweet.toString());
        localStorage.setItem('backgroundColor', props.background || DEFAULT_VALUE.BACKGROUND_COLOR);
        localStorage.setItem('isStreamMode', props.isStreamMode.toString());

        params = params != '' ? '?' + params : '';
        props.setMaxDispTweet(maxDispTweet);
        params = params.endsWith('&') ? params.replace('&', '') : params;
        props.setSocketUrl(BASE_WS_URL + params);
    };

    return(
        <motion.div
            className={classes.settingContainer}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={windowDimensions.height}
            ref={containerRef}
        >
            <motion.div className={classes.background} variants={sidebar} > 
            <button className={classes.button} onClick={handleClickSetting}>
                <svg width="23" height="23" viewBox="0 0 23 23">
                <motion.path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="hsl(0, 0%, 18%)"
                    strokeLinecap="round"
                    variants={{
                    closed: { d: "M 2 2.5 L 20 2.5" },
                    open: { d: "M 3 16.5 L 17 2.5" }
                    }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="hsl(0, 0%, 18%)"
                    strokeLinecap="round"
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                    }}
                    transition={{ duration: 0.1 }}
                />
                <motion.path
                    fill="transparent"
                    strokeWidth="2"
                    stroke="hsl(0, 0%, 18%)"
                    strokeLinecap="round"
                    variants={{
                    closed: { d: "M 2 16.346 L 20 16.346" },
                    open: { d: "M 3 2.5 L 17 16.346" }
                    }}
                />
                </svg>
            </button>
            
            {/* <div className={classes.dialog}> */}
                <Grid container className={classes.dialog}>
                    <Grid item xs={1}></Grid>
                    <Grid container item xs={10} className={classes.dialogContent}>
                        <div className={classes.title}>
                            {/* <Typography> */}
                            Setting
                            {/* </Typography> */}
                        </div>
                        <div className={classes.hashtag}>
                            <p>Hashtag</p>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <TagIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField 
                                    id="input-with-sx" 
                                    variant="standard" 
                                    multiline 
                                    style={{marginRight: 10}}
                                    onChange={handleHashtagOnChange}
                                    value={hashtag}
                                />
                                <Tooltip 
                                    title="通常のタイムラインではなく、指定したハッシュタグを含むフォローしていない人のツイートのタイムラインに変更します
                                    ※短い時間(数分)で何度も変更すると一時的にタイムラインへの接続がTwitterから拒まれる場合があります"
                                    arrow 
                                    placement="right"
                                    style={{zIndex: 3000}}
                                >
                                    <HelpIcon fontSize='small'  color='disabled'/>
                                </Tooltip>
                            </Box>
                        </div>
                        <Divider variant="middle" />
                        <div className={classes.timeline}>
                            <p>Timeline</p>
                        </div>
                        <div className={classes.subTimeline}>
                            <p>Max display tweet</p>
                            <Slider
                                aria-label="maxdisptweet"
                                defaultValue={props.localMaxDispTweet}
                                // getAriaValueText={valuetext}
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                min={70}
                                max={130}
                                color='secondary'
                                value={maxDispTweet}
                                onChange={(event, newValue) => setMaxDispTweet(newValue as number)}
                            />
                            <p>Filter level</p>
                            <ButtonGroup variant="text" aria-label="text button group" color='inherit'>
                                <Button onClick={() => setFilterLevel('low')} color={filterLevel == 'low' ? 'secondary' : 'inherit'}>Low</Button>
                                <Button onClick={() => setFilterLevel('medium')} color={filterLevel == 'medium' ? 'secondary' : 'inherit'} >Medium</Button>
                                <Button onClick={() => setFilterLevel('heigh')} color={filterLevel == 'heigh' ? 'secondary' : 'inherit'}>High</Button>
                            </ButtonGroup>
                        </div>
                        <Divider variant="middle" />
                        <div className={classes.timeLineBackGround}>
                            <p>Background Color</p>
                            <TextField 
                                id="input-with-sx" 
                                variant="standard" 
                                label="Hex color"
                                onChange={handleBackgroundOnChange}
                                value={props.background}
                            />
                            <FormControl component='fieldset'>
                                <FormControlLabel
                                    label='Enable Stream Mode'
                                    labelPlacement='start'
                                    value='ONにすると画像がダブルクリックされるまでぼやけます'
                                    control={
                                        <Checkbox 
                                        color='secondary'
                                        value={props.isStreamMode} 
                                        onChange={(event, checked) => props.setStreamMode(checked)} 
                                        title='ONにすると画像がダブルクリックされるまでぼやけます
                                        動画のサムネイルには適用されません'
                                        />
                                    }
                                    style={{
                                        marginTop: 20,
                                    }}
                                />
                            </FormControl>
                            
                        </div>
                    </Grid>
                    <Grid item xs={1}></Grid>
                        
                </Grid>
            {/* </div>  */}
                <div className={classes.applyButton}>
                    <Button 
                        onClick={confirmChangeSetting} 
                        variant='outlined' 
                        style={{
                            fontSize: 14
                        }}
                        color='inherit'
                    >
                        Apply
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    )
}
export default memo(SettingDialog);