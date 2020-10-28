'use strict'
const nacl = require('libsodium-wrappers')

module.exports = async() =>{
    await nacl.ready

    let kpair = nacl.crypto_sign_keypair()

    return Object.freeze({
        verifyingKey: kpair.publicKey,
        sign: (msg)=>{
            return nacl.crypto_sign(msg,kpair.privateKey)
        }
    })
}