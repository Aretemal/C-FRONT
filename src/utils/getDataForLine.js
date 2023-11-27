import moment from "moment";

const getDataForLine = (data, key) => {
    const filteredData = data.map((el) => el.attributes);
    let startDate = filteredData?.[0]?.created,
        endDate = filteredData?.[0]?.created;
    filteredData.forEach((el) => {
        if (moment(el.created).isBefore(startDate)) {
            startDate = el.created;
        }
    })
    const days = [];
    const daysCount = moment().diff(startDate, 'days');
    const currentDate = startDate;
    for (let i = 0; i <= daysCount; i++) {
        days.push(moment(currentDate).format('YYYY-MM-DD'));
        moment(currentDate).add(1, 'days')
    }
    const dateAnt = days.map(el => ({ date: el, [key]: 0 }));
    const dataForAnt = filteredData.reduce((acc, el) => {
        const day = acc.filter(item => moment(item?.date).format('YYYY-MM-DD') === moment(el.created).format('YYYY-MM-DD'))
        day[0][key] += 1;
        return acc;
    }, dateAnt)
    return dataForAnt;
}

export default getDataForLine;