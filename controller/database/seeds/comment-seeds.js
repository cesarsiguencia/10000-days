const { Comment }  = require('../../../models')

const commentData = [
    {
        comment_text: "See you there bud!",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "Let's go Cez!",
        user_id: 2,
        post_id: 1
    },
    {
        comment_text: "I'm down!",
        user_id: 3,
        post_id: 2
    }
]

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = {
    commentSeeds
}