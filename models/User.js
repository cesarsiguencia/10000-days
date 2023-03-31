const { Model, DataTypes } = require('sequelize')
const sequelizeConnect = require('../controller/config')

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            type: DataTypes.STRING(64),
            allowNull: false,
            validate: {
                len: [8],
                is: /^[0-9a-f]{64}$/i
                
            }
        }
    },
    {
        sequelizeConnect,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User;