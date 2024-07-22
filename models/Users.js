const Sequelize=require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rules: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ["admin", "user"]
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at"
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at"
        }
    })
    const Address=require("./Address")(sequelize,Sequelize)
    Users.hasOne(Address, {as:"address",foreignKey:"user_id"})
    return Users
}