'use strict'

const nacl = require('libsodium-wrappers')
const Encryptor = require('./Encryptor')
const Decryptor = require('./Decryptor')

module.exports = async (peer) => {
  await nacl.ready;
  let otherPeer = {};
  let decryptor, encryptor;
  global.message = {};
  const keypair = nacl.crypto_kx_keypair();

  let object = Object.freeze({
     publicKey: keypair.publicKey,
     createSharedKeys: async (secondPeer) => {
          otherPeer = secondPeer;      
          const server_keys = nacl.crypto_kx_server_session_keys(keypair.publicKey, keypair.privateKey, otherPeer.publicKey);
          decryptor = await Decryptor(server_keys.sharedRx);
          encryptor = await Encryptor(server_keys.sharedTx);
     },
     encrypt: (msg) => {
          return encryptor.encrypt(msg);
     },
     decrypt: (ciphertext, nonce) => {
          return decryptor.decrypt(ciphertext, nonce);
     },
     send: (msg) => {
          otherPeer.setMessage(object.encrypt(msg));
     },
     receive: () => {
          return object.decrypt(message.ciphertext, message.nonce);
     },
     setMessage: (msg) => {
          message = msg;
     }
  });

  if (peer) {
     otherPeer = peer;
      const client_keys = nacl.crypto_kx_client_session_keys(keypair.publicKey, keypair.privateKey, otherPeer.publicKey);
      otherPeer.createSharedKeys(object);
      decryptor = await Decryptor(client_keys.sharedRx);
      encryptor = await Encryptor(client_keys.sharedTx);
  }
  return object;
}