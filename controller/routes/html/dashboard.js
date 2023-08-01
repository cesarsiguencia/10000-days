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
                loggedIn: req.session.loggedIn,
                loggedUser: req.session.user_id
            })
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

// router.get('/', (req,res) => {

//     User.findOne(
//         {
//             attributes: {exclude: ['password']}
//         },
//         {
//             where: {
//                 id: req.session.user_id
//             }
//         }
//     ).then(user => {
//         loggedUser = user.id
//         res.render(`
//         <img src="/media/icons/edit.png" />
//         <img src="/media/icons/trash.png" />`, loggedUser)
        
//     })
// })

module.exports = router