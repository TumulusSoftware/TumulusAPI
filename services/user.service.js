const config = require('../_config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const comm = require('_helpers/comm');
const bc = require('_helpers/bc'); // bc=blockchain
const {hybridEncryptHexKey} = require('tumulus-crypto');

const fetch = require('node-fetch');
const handleResponse = require('_middleware/handleResponse');

module.exports = {
    authenticate,
    getAll,
    getById,
    getTransactionList,
    verify,
    create,
    update,
    delete: _delete
};

async function getTransactionList(user) {
    const url = `${process.env.TUMULUS_API_SERVER}/transaction/get-transaction-list?address=${user.walletAddress}`;
    const requestOptions = { method: 'GET' };
    const data = await fetch(url, requestOptions)
        .then(handleResponse);
    return data;    
}

async function authenticate({ emailAsId, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { emailAsId } });

    if (!user || !(await bcrypt.compare(password, user.hash)))
        throw 'email or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}


// async function getAll1() {
//     // Upgrade:  migrate from using privateKey to safeKey 2022-08-23
//     const salt = process.env.SALT;
//     const tmlPublicKey = config.getTumulusPublicKey();
//     const users =  await db.User.findAll();
//     for (let user of users) {
//         // console.log(user);
//         if ( user.walletAddress == null && user.privateKey != null) {
//             user.walletAddress = user.publicKey;
//             user.safeKey = await hybridEncryptHexKey(user.privateKey, tmlPublicKey, salt);
//             await user.save();
//         }
//         // console.log(user);
//     }
//     return users;
// }
async function getAll() {
    return await db.User.scope("emailOnly").findAll();
}

async function getById(id) {
    return await getUser(id);
}

async function verify(veriCode, id) {
    const user = await getUser(id);
    if (user.status != 'NEW') {
        throw 'You are already verified.  No need to do it again.';
    }
    if (user.vcode != veriCode) {
        throw 'Verification code incorrect';
    }

    const cert = await bc.createAccount();

    user.walletAddress = cert.address;
    user.privateKey = cert.privateKey;
    user.status = 'VERIFIED';
    user.vcode = '';

    await user.save();
    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { emailAsId: params.emailAsId } })) {
        throw 'email "' + params.emailAsId + '" has already registered. Please log in.';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    params.vcode = (Math.floor(100000 + Math.random() * 900000)).toString();

    // 2022-07-16
    const user = await db.User.create(params);

    comm.sendVcode(user);

    const token = jwt.sign({ sub: user.id }, process.env.SECRET, { expiresIn: '7d' });
    return { ...omitHash(user.get()), token };
}

async function update(id, params) {
    const user = await getUser(id);

    // validate
    const emailAsIdChanged = params.emailAsId && user.emailAsId !== params.emailAsId;
    if (emailAsIdChanged && await db.User.findOne({ where: { emailAsId: params.emailAsId } })) {
        throw 'email "' + params.emailAsId + '" has already registered.';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // copy params to user and save
    Object.assign(user, params);
    await user.save();

    return omitHash(user.get());
}

async function _delete(id) {
    const user = await getUser(id);
    await user.destroy();
}

// helper functions

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}

function omitHash(user) {
    const { hash, vcode, privateKey, ...userWithoutHash } = user;
    return userWithoutHash;
}
