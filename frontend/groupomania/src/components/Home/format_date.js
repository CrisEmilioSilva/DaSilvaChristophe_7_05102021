import moment from 'moment'

function format_date(value){
    if (value) {
      return moment(String(value)).format('DD-MM-YYYY  HH:MM')
     }
 }

export default format_date