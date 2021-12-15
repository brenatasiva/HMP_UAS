export class PostModel {
    public idpost: number;
    public caption: string;
    public username: string;
    public date: string;
    public url: string;

    constructor(idpost: number, caption: string, username: string, date: string, url: string) {
        this.idpost = idpost;
        this.caption = caption;
        this.username = username;
        this.date = date;
        this.url = url;
    }
}
