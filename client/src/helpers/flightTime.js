
// retrieve the time difference for flight times. Inputs in ISO format. Returns string in '? d ? h ? min' format
const findDifference = (isoDateDeparture, isoDateArrival) => {
    let date1 = new Date(isoDateDeparture);
    let date2 = new Date(isoDateArrival);

    let difference = date2 - date1;

    return difference;
}

const formatDuration = (difference) => {

    let diffRemaining = difference;

    let days = Math.floor(diffRemaining / 1000 / 60 / 60 / 24);
    diffRemaining -= days * 24 * 60 * 60 * 1000;
    let hours = Math.floor(diffRemaining / 1000 / 60 / 60);
    diffRemaining -= hours * 60 * 60 * 1000;
    let minutes = Math.floor(diffRemaining / 1000 / 60);
    
    return (`${days} d ${hours} h ${minutes} min`);
}

const formatTime = (date) => {
    let formDate = new Date(date);

    const result = formDate.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    })

    return result;
}

const createDate = (isoDate) => {
    let date = new Date(isoDate);
    return date;
}

export { findDifference, formatTime, formatDuration, createDate };