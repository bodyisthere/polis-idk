export default function convertDate(date) {
    console.log(date)
    const data = ['Января','Февраля','Марта','Апреля','Мая','Июня','Июля','Августа','Сентября','Октября','Ноября','Декабря',]
    const time = date;

    const regexp = new RegExp(/^\d{1,2}/,'gi');

    time[1] = data[time[1]-1];
    time[2] = time[2].match(regexp, ' ').join('');
    time[3] = time[2];
    time[2] = time[0];
    time[0] = time[3] + '';
    time.pop();
    return time.join(" ")
}