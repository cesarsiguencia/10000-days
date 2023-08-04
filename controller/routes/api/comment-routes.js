const router = require("express").Router()

const { Comment } = require("../../../models/index")

router.post('/', (req, res)=>{
    console.log("I am working for comments")
    Comment.create({
        comment_text: req.body.newComment,
        user_id: req.session.user_id,
        post_id: req.body.currentEditPostId
    }).then(createdComment=> {
        res.json('success')
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/delete/:selectedComment', (req,res)=> {
    Comment.destroy({
        where: {
            id: req.params.selectedComment
        }
    }).then(deletedComment =>{
        if(!deletedComment){
            res.status(404).json("Comment does not exist")
        }
        res.json(deletedComment)
    }).catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router