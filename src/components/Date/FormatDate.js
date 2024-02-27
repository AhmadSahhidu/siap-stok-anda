import moment from "moment";

export const FormatDate = (date) => {
    return moment(date).locale('id').format('dddd, D MMMM YYYY');
}

export const FormatDateTime = (date) => {
    return moment(date).locale('id').format('dddd, D MMMM YYYY HH:mm:ss');
}

export const ConvertUTCTimeToDateTime = (date) => {
    return moment(date).utcOffset('+07:00').format('YYYY-MM-DD HH:mm:ss');
}