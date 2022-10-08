const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        no             : { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        method         : { type: DataTypes.STRING , allowNull: true },
        status         : { type: DataTypes.STRING , allowNull: true },
        gasUsed        : { type: DataTypes.INTEGER, allowNull: true },
        id             : { type: DataTypes.BIGINT , allowNull: true },
        owner          : { type: DataTypes.STRING , allowNull: true },
        viewer         : { type: DataTypes.STRING , allowNull: true },
        announcer      : { type: DataTypes.STRING , allowNull: true },
        assetId        : { type: DataTypes.BIGINT , allowNull: true },
        bit            : { type: DataTypes.INTEGER, allowNull: true },
        data           : { type: DataTypes.STRING , allowNull: true },
        sno            : { type: DataTypes.INTEGER, allowNull: true },
        value          : { type: DataTypes.INTEGER, allowNull: true },
        arguments      : { type: DataTypes.STRING , allowNull: true },
        transactionHash: { type: DataTypes.STRING , allowNull: true },
    };

    const options = {
        defaultScope: {
            attributes: {}
        },
        scopes: {
        }
    };

    return sequelize.define('TxLog', attributes, options);
}
