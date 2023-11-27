import moment from "moment";

const getDataForPayments = (data, key) => {
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

    let currentDate = startDate;
    for (let i = 0; i <= daysCount; i++) {
        days.push(moment(currentDate).format('YYYY-MM-DD'));

        currentDate = moment(currentDate).add(1, 'day')
    }
    const addDateAnt = days.map(el => ({ date: el, [key]: 0, type: 'Пополнение (BYN)' }));
    const dateAnt = [...addDateAnt, ...days.map(el => ({ date: el, [key]: 0, type: 'Вывод (BYN)' }))];
    const dataForAnt = filteredData.reduce((acc, el) => {
        const statusItem = +el?.amount > 0 ? 'Пополнение (BYN)' : 'Вывод (BYN)';
        const day = acc.filter(item => {
            return moment(item?.date).format('YYYY-MM-DD') === moment(el.created).format('YYYY-MM-DD')
                && statusItem === item?.type
        })
        day[0][key] += Math.abs(el?.amount);
        return acc;
    }, dateAnt)

    return dataForAnt;
}

export default getDataForPayments;