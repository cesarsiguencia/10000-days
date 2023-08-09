const  Post  = require('../../../models/Post')

const postData = [
    {
        post_text: "Can't wait to see you all on October 21st!!!",
        user_id: 1
    },
    {
        post_text: "Any in NYC wanna meet up before hand at this location?",
        post_link: "https://www.serafinarestaurant.com/location/serafina-upper-west/",
        user_id: 2
    },
    {
        post_text: "Here is the venue for the event",
        post_link: "https://meauxspace.com/",
        user_id: 1
    }
]

const postSeeds = () => Post.bulkCreate(postData);

module.exports = {
    postSeeds
} 