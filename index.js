const crypto = require('crypto')
const Promise = require('bluebird')
const co = Promise.coroutine
const stringify = require('json-stable-stringify')
const STORAGE_KEY = require('./package').name

module.exports = function requireModels (models) {
  const hash = hashModels(models)
  return function install (bot) {
    const sendModelsPack = co(function* sendModelsPack (user) {
      yield bot.send({
        userId: user.id,
        object: {
          _t: 'tradle.ModelsPack',
          models
        }
      })
    })

    return bot.addReceiveHandler(co(function* ({ user }) {
      const storedHash = user[STORAGE_KEY]
      if (storedHash !== hash) {
        yield sendModelsPack(user)
        user[STORAGE_KEY] = hash
        bot.users.save(user)
      }
    }))
  }
}

function sortById (a, b) {
  if (a.id < b.id) return -1
  if (a.id > b.id) return 1
  return 0
}

function hashModels (models) {
  const sorted = models.slice().sort(sortById)
  return sha256(stringify(sorted))
}

function sha256 (str) {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest('hex')
}
