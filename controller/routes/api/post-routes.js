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

router.delete('/delete', (req, res) => {
    Post.destroy({
        where: {
            id: req.body.selectedPost
        }
    }).then(deletedPost => {
        if(!deletedPost){
            res.status(404).json('Post does not exist')
            return
        }
        res.json(deletedPost)
    }).catch(err => {
        res.status(500).json(err)
    })
})



module.exports = router