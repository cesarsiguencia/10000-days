const router = require("express").Router()

const { Post } = require("../../../models/index")

router.post('/', (req, res) => {
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

router.delete('/delete/:selectedPost', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.selectedPost
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

router.put('/update/text/:selectedPost', (req, res) => {
    Post.update(
        {
            post_text: req.body.updatedText
        },
        {
            where: {
                id: req.params.selectedPost
            }
        }
    ).then(newText => {
        if(!newText){
            res.status(404).json('Post does not exist')
            return
        }
        res.json(newText)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/update/link/:selectedPost', (req,res) => {
    Post.update(
        {
            post_link: req.body.updatedLink
        },
        {
            where: {
                id: req.params.selectedPost
            }
        }
    ).then(newLink => {
        if(!newLink){
            res.status(404).json({ message: 'Post does not exist'})
            return;
        }
        res.json(newLink)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router