'use strict'
const nacl = require('libsodium-wrappers')


module.exports = async(peer=null) =>{
    await nacl.ready

    let thisPeer = {}
    let otherPeer = {}
    global.message = {}
    const { publicKey, privateKey } = nacl.crypto_kx_keypair()

    thisPeer.publicKey=publicKey



    return Object.freeze(thisPeer)

}