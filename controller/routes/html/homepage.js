const router = require('express').Router()

const { Post , User } = require('../../../models')

router.get('/', (req,res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postsFromDb => {
            const posts = postsFromDb.map(post => post.get({
                plain:true
            }));
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

module.exports = router