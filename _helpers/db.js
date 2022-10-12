const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
	// create db if it doesn't already exist
	// const { host, port, user, password, database } = config.database;
	const { host, port, user, password, database } = JSON.parse(process.env.DATABASE);
	const connection = await mysql.createConnection({
		host,
		port,
		user,
		password,
	});
	await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

	// connect to db
	const sequelize = new Sequelize(database, user, password, {
		host: host,
		dialect: "mysql",
		// disable logging; default: console.log
		logging: false,
		define: {
			freezeTableName: true
		}
	});

	// init models and add them to the exported db object
	db.User = require("models/user")(sequelize);
	db.Asset = require("models/asset")(sequelize);
	db.TxLog = require("models/txLog")(sequelize);

	db.User.hasMany(db.Asset);
	db.Asset.belongsTo(db.User);

	// sync all models with database
	await sequelize.sync();
}
