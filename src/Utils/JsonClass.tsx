export class Tweet {
    tweet_id: number = 0;
    user_id: number = 0;
    retweeted_user_id: number = 0;
    user_avater: string = '';
    screen_name: string = '';
    user_name: string = '';
    text: string = '';
    rt_count: number = 0;
    fav_count: number = 0;
    media_src: string[] = [];
    have_photo: boolean = false;
    media_content: MediaContent = new MediaContent();
    x:number = 0;
    y:number = 0;
    z:number = 0;
}

export class MediaContent {
    type:string = '';
    preview:string = '';
    src:string[]  = [];
}

export class Settings {
    hashTag:string =  '';
    filterLevel:string = '';
    maxDisplayTweet:number = 0;
}