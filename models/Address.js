const Sequelize=require("sequelize")
module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("Address", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
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
    // const Users=require("./users")(sequelize,Sequelize)
    // Address.belongsTo(Users,{
    //     foreignKey:"user_id",
    //     as : "user",
    //     underscored : true
    // })
    return Address
}