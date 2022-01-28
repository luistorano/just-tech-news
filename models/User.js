const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create our User model
class User extends Model {}


// Define table columns and configuration
User.init(
    {
        //TABLE COLUMN DEFINITIONS GO HERE
        id: {
            //Use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTERGER,
            // This is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // Instruct that this is the Primary Key
            primaryKey: true,
            // Turn on auto increment
            autoIncrement: true
        },
        // Define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // There cannot be duplicate email values in this table
            unique: true,
            // If allowNull is set to false, we can run our data through validator before creating a data table data
            validate: {
                isEmail:true
            }
        },
        // Define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // This means the password must be at least 4 characters long
                len: [4]
            }
        }
    },  
    {
        sequelize,  
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // Pass in our imported sequelize connection (The direct connection to our database) sequelize,

        // Don't automatically create createAt/usdateAt timestamp fields
        timestamps: false,

        // Don't pluralize name of database table
        freezeTableName: true,

        // Use underscores instead of camel-casing (i.e. `comment-text` and not commentText)
        underscore: true,
        
        // Make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;