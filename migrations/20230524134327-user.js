'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        full_name: {
          type : Sequelize.STRING,
          allowNull: false,
        },
        email:{
          type : Sequelize.STRING,
          allowNull:false,
        },
        password:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        avatar:{
          type : Sequelize.STRING,
          allowNull: false,
        },
        rules:{
          type: Sequelize.ENUM,
          allowNull:false,
          values:["admin", "user"]
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        }

    });
    await queryInterface.addConstraint("users", {
      type: 'unique',
      fields: ["email"],
      name: "UNIQUE_USER_EMAIL"
    })

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

  }
};
