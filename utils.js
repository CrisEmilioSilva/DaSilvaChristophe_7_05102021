export const dateParser = (num) => {
    let options = {hour: "2-digit", minute: "2-digit", second: "2-digit",
weekday: "long", year: "numeric", month: "short", day:"numeric"};

let dateTimes = Date.parse(num);

let date = new Date(dateTimes).toLocaleDateString(fr-FR, options);

return date.toString();
}