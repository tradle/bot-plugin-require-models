
module.exports = function requireModels (models) {
  return function install (bot) {
    bot.users.on('create', function (user) {
      bot.send({
        userId: user.id,
        object: {
          _t: 'tradle.ModelsPack',
          models
        }
      })
    })
  }
}
