import moment from 'moment';
export const formatTime = (input: string): string => {
    const momentObj = moment.utc(input);
    const formattedDateStr = momentObj.format("MMMM D, YYYY");
    return formattedDateStr
}
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      return accessToken;
    } else {
      return undefined;
    }
}