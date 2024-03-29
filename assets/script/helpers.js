module.exports = {
    format_date: (date) => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date).getFullYear()}`;
    },

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
        return word;
    },

    format_url: url => {
        return url
          .replace('http://', '')
          .replace('https://', '')
          .replace('www.', '')
          .split('/')[0]
          .split('?')[0];



    },

    checkUserId: (post_user_id, loggedId) =>{
        // loggedId = 4
        
        if(post_user_id == loggedId){
            return true
        }

    }
}