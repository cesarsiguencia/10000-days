const router = require("express").Router();

const { User } = require("../../../models/index")

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(usersFromDb => res.json(usersFromDb))
        .catch(err => {
            res.status(500).json(err)
        })
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    }).then(userFromDb => {
        if (!userFromDb) {
            res.status(404).json({ message: 'User does not exist' })
            return;
        }
        res.json(userFromDb)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/email', (req, res) => {
    User.update(
        {
            email: req.body.newEmail
        },
        {
            where: {
                id: req.session.user_id
            }
        }

    ).then(userFromDb => {
        console.log(userFromDb, 'hi cez')
        if (!userFromDb) {
            res.status(404).json({ message: 'User does not exist' })
            return;
        }
        // if(userFromDb == [0]){
        //     console.log('New email input is equal to previous email. No changes')
        //     res.json({ message:'New email input is equal to previous email. No changes'})
        //     return;
        // }
        res.json(userFromDb)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/username', (req, res) => {
    User.update(
        {
            username: req.body.newUsername
        },
        {
            where: {
                id: req.session.user_id
            }
        }
    ).then(userFromDb => {
        if (!userFromDb) {
            res.status(404).json({ message: 'User does not exist' })
            return;
        }
        res.json(userFromDb)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/password', (req, res) => {
    User.update(
        {
            password: req.body.newPassword
        },
        {
            where: {
                id: req.session.user_id
            }
        }
    ).then(userFromDb => {
        if (!userFromDb) {
            res.status(404).json({ message: 'User does not exist' })
            return;
        }
        res.json(userFromDb)
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.put('/rsvp', (req, res) => {
    User.update(
        {
            rsvp: req.body.newRSVP
        },
        {
            where: {
                id: req.session.user_id
            }
        }
    ).then(userFromDb => {
        if (!userFromDb) {
            res.status(404).json({ message: 'User does not exist' })
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
        password: req.body.password,
        rsvp: req.body.attendance
    })
        .then((newUser => {
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true

            })
            res.json(newUser)


        })).catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.loginEmail
        }

    }).then(loggedUser => {
        if (!loggedUser) {
            res.status(400).json({ message: 'No user found with this email' });
            return;
        }

        // const passwordCheck = loggedUser.checkPassword(req.body.loginPassword)

        // if(!passwordCheck){
        //     res.status(400).json({ message: 'Incorrect password'})
        // }

        req.session.save(() => {
            req.session.user_id = loggedUser.id,
                req.session.username = loggedUser.username,
                req.session.loggedIn = true
            res.json({ user: loggedUser, message: 'Logged In' })
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end
    }
})

module.exports = router;