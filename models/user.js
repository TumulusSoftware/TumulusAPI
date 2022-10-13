const { DataTypes } = require("sequelize");

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName     : { type: DataTypes.STRING , allowNull    : false },
        lastName      : { type: DataTypes.STRING , allowNull    : false },
        emailAsId     : { type: DataTypes.STRING , allowNull    : false },
        vcode         : { type: DataTypes.STRING , allowNull    : true  },
        walletAddress : { type: DataTypes.TEXT   , allowNull    : true  },
        safeKey       : { type: DataTypes.TEXT   , allowNull    : true  },
        publicKey     : { type: DataTypes.TEXT   , allowNull    : true  },
        privateKey    : { type: DataTypes.TEXT   , allowNull    : true  },
        status        : { type: DataTypes.STRING , defaultValue : 'NEW' },
        hash          : { type: DataTypes.STRING , allowNull    : false }
    };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
      emailOnly: { attributes: {exclude: ["vcode", "walletAddress", "safeKey", "publicKey", "privateKey", "status", "hash"]}}
    },
  };

  return sequelize.define("User", attributes, options);
}
