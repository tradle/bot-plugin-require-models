
module.exports = function requireModels (models) {
  return function install (bot) {
    function onCreateUser (user) {
      bot.send({
        userId: user.id,
        object: {
          _t: 'tradle.ModelsPack',
          models
        }
      })
    }

    bot.users.on('create', onCreateUser)

    return function disable () {
      bot.users.removeListener('create', onCreateUser)
    }

  }
}
