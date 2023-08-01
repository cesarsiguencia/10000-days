const { Model, DataTypes } = require('sequelize')
const sequelize = require('../controller/config/connections')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull:false,

        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        rsvp: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
        // ,
        // password: {
        //     type: DataTypes.STRING(64),
        //     allowNull: false,
        //     validate: {
        //         len: [8],
        //         is: /^[0-9a-f]{64}$/i
                
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;