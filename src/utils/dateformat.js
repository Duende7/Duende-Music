export const dateFormat = function(times) {
    let time = new Date(times);
    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, '0');
    let date = time.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${date}`;
}

export const dateFormatFull = function(times) {
    let time = new Date(times);
    let year = time.getFullYear();
    let month = (time.getMonth() + 1).toString().padStart(2, '0');
    let date = time.getDate().toString().padStart(2, '0');
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

export const duration = function(times) {
    let time = new Date(times);
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

export const currentTime = function(times) {
    let time = Math.floor(times);
    if (time <= 60) {
        let seconds = time.toString().padStart(2, '0');
        return `00:${seconds}`;
    } else {
        let seconds = (time % 60).toString().padStart(2, '0');
        let minutes = Math.floor(time / 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }
}