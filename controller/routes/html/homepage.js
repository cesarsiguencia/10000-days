const router = require('express').Router()

const { Post , User } = require('../../../models')

const { getLinkPreview, getPreviewFromContent } = require("link-preview-js")

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
            const uneditedPosts = postsFromDb.map(post => post.get({
                plain:true
            }));

            async function renderingComplete() {
                const posts = await creatingOGPosts(uneditedPosts)
                setTimeout(()=>{
                    res.render('homepage', {
                        posts,
                        loggedIn: req.session.loggedIn,
                    })
                },250)
            }
            renderingComplete()
        })
        .catch(err => {
            res.status(500).json(err)
        })
});

async function creatingOGPosts(newArray) {
    var fetchingOGs = () => {

        return new Promise(resolve => {
            newArray.forEach(fetchedPost => {

                if (fetchedPost.post_link) {
                    getLinkPreview(fetchedPost.post_link).then((data) => {
                        fetchedPost.openGraphMaterial = data
                        return new Promise(resolve => {
                            resolve(data)
                        })
                    }).catch(err => {
                        return undefined
                    })
                }
            })
            resolve(newArray)
        })
    }
    const newEditedPosts = await fetchingOGs()
    return newEditedPosts
}

module.exports = router