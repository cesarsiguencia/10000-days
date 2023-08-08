const router = require('express').Router()

const { Post, Comment, User } = require('../../../models')

const { getLinkPreview, getPreviewFromContent } = require("link-preview-js")

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
            const posts = postsFromDb.map(post => 
                
                post.get({
                plain: true
                })
            );

            const newPostBatch = posts.map(fetchedPost => {
                if(fetchedPost.post_link){
                    
                    fetchOG(fetchedPost.post_link).then((result)=>{
                        if(!result){
                            console.log('nothing was returned with website lacking OG')
                            fetchedPost.openGraphMaterial = undefined
                            return
                        } else {
                            console.log("this site has OF")
                            fetchedPost.openGraphMaterial = result
                        }
                        

                    })
              
                }
                
            })
            posts = newPostBatch
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

async function fetchOG(website){
    // // const url = document.querySelector("a[post-link-id='2']")
    // console.log(url)

    console.log(website, "we should have a website here")

    // var link = String(website)
    // console.log(link, 'this is a string')

    var urls = await getLinkPreview(website).then((data)=>{
        return data
    }).catch(err => {
        console.log("no OG available for picked website, return undefined")
        return
    })

    console.log(urls, 'after the catch')
    return urls
}

module.exports = router