const router = require("express").Router()

const { Post } = require("../../../models/index")

router.post('/', (req, res) => {
    console.log(req.body)

    Post.create({
        post_text: req.body.postText,
        post_link: req.body.postLink,
        user_id: req.session.user_id
    }).then(postData => {
        res.json( 'success')
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router