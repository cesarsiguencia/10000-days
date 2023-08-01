const router = require('express').Router()

const { Post, User } = require('../../../models')

router.get('/', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username', 'rsvp']
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(postsFromDb => {
            const posts = postsFromDb.map(post => post.get({
                plain: true
            }));
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