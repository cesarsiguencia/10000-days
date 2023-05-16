const router = require("express").Router();

const { User } = require("../../../models/index")

router.get('/', (req,res) => {
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(usersFromDb => res.json(usersFromDb))
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/:id', (req,res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        }
    }).then(userFromDb => {
        if(!userFromDb){
            res.status(404).json({ message: 'User does not exist'})
            return;
        }
        res.json(userFromDb)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    User.create({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then((newUser => {
            req.session.save(()=>{
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true 
                res.json(newUser)
                console.log(newUser)
                console.log(req.session.loggedIn, ' =session from me')
            })

        }))
})

router.post('/logout', (req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end
    }
})

module.exports = router;