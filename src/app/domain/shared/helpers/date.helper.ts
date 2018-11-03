export class DateHelper {
    static formatDate(date) {
        const d = new Date(date);
        let   month = '' + (d.getMonth() + 1),
              day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) { 
            month = '0' + month;
        }
        if (day.length < 2) { 
            day = '0' + day;
        }
    
        return [year, month, day].join('-');
    }

    static toDateOnly(date: Date) {
        return new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate());
    }
}
