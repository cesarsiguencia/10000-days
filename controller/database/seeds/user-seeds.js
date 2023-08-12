const { User }  = require('../../../models')

const userData = [
    {   
        first_name:"Cesar",
        last_name:"Siguencia",
        username: "birthdayboy",
        email: "cesar@gmail.com",
        password: 'abcd1234',
        rsvp: true
    },
    {
        first_name:"Paul",
        last_name:"Whits",
        username: "pablo",
        email: "pablo@gmail.com",
        password: '1234abcd',
        rsvp: true
    },
    {
        first_name:"John",
        last_name:"Meds",
        username: "johnjes",
        email: "john@gmail.com",
        password: 'password',
        rsvp: true
    },
]

const userSeeds = () => User.bulkCreate(userData);

module.exports = {
    userSeeds
} 