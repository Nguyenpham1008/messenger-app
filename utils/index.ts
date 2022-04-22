import moment from "moment"

export const displayTimeForChat = (time: number) => {
    if (moment(time) && time != undefined && time > 0)
        return moment(time/1000).fromNow()
    else 
        return ""
}