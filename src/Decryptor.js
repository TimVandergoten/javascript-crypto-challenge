'use strict'
const nacl = require('libsodium-wrappers')

module.exports = async(key) =>{
    await nacl.ready

    if (!key) throw 'no key'

    return Object.freeze({
        decrypt: (cyphertext, nonce)=>{
            if(!cyphertext || !nonce) throw 'argument(s) undefined'

            return nacl.crypto_secretbox_open_easy(cyphertext,nonce,key)
        }
    })
    
}