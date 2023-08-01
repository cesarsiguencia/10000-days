module.exports = {
    // format_date: (date) => {
    //   return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    //     date).getFullYear()} ${new Date(date).getHours() % 12 || 12 }:${new Date(date).getMinutes()} ${new Date(date.get)}`;
    // },

    format_time: (date) => new Intl.DateTimeFormat('default',
    {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    }).format(new Date(date)),

    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
        console.log(word)
        return word;
    },

    format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];
    }
}