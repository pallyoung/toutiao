'use string'
import string from './string';
function parse(timestring, format) {
    var date = new Date(timestring);
    return format.replace(/\w+/g, function (match) {
        switch (match) {
            case 'yyyy':
                return date.getFullYear();
            case 'yy':
                return date.getFullYear().toString().slice(-2)
            case 'MM':
                return string.leftPad(date.getMonth() + 1, 2, '0');
            case 'dd':
                return string.leftPad(date.getDate(), 2, '0');
            case 'HH':
                return string.leftPad(date.getHours(), 2, '0');
            case 'mm':
                return string.leftPad(date.getMinutes(), 2, '0');
            case 'ss':
                return string.leftPad(date.getSeconds(), 2, '0');
            default:
                return match;
        }
    })
}
function rest(s) {
    return s.getTime() - Date.now();
}
function countDown(endTime, callback, interval) {
    var timeoutid;
    interval=interval||500;
    var s = new Date(endTime);
    function next(){
        var r = rest(s);
        if (r> 0) {
            timeoutid = setTimeout(next, interval)
        }
        callback(r);
    }
    function stop(){
        clearTimeout(timeoutid)
    }
    next();

    return stop;
}

function formatLeftTime(time) {
    var formatTime = '';
    var hours = parseInt(time / 1000 / 60 / 60 % 24, 10);
    var minutes = parseInt(time / 1000 / 60 % 60, 10);
    var seconds = parseInt(time / 1000 % 60, 10);
    formatTime += (hours < 10 ? '0' + hours : hours) + '小时';
    formatTime += (minutes < 10 ? '0' + minutes : minutes) + '分';
    formatTime += (seconds < 10 ? '0' + seconds : seconds) + '秒';
    return formatTime;
}

export default {
    parse,
    formatLeftTime,
    countDown
}