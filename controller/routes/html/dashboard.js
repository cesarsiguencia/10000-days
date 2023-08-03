const router = require('express').Router()

const { Post, Comment, User } = require('../../../models')

router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username', 'rsvp']
            },
            {
                model: Comment, 
                attributes: ['id','comment_text', 'user_id', 'post_id'],
                include:{
                    model: User,
                    attributes: ['username', 'id']
                }
            }
        ],
        order: [
            ['updatedAt', 'DESC']
        ]
    })
        .then(postsFromDb => {
            const posts = postsFromDb.map(post => post.get({
                plain: true
                
            }));
            console.log(posts)
            res.render('dashboard', {
                posts,
                loggedUserId: req.session.user_id,
                loggedIn: req.session.loggedIn,
                
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

module.exports = router