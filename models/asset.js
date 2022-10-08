const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        sno      : { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        assetId  : { type: DataTypes.BIGINT , defaultValue : 0                      },
        fileName : { type: DataTypes.STRING , allowNull    : false                  },
        tags     : { type: DataTypes.STRING , allowNull    : true                   },
        status   : { type: DataTypes.STRING , allowNull    : true                   }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: {}
        },
        scopes: {
        }
    };

    return sequelize.define('Asset', attributes, options);
}