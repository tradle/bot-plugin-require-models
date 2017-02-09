
const Promise = require('bluebird')
const co = Promise.coroutine
const test = require('tape')
const requireModels = require('./')

test('basic', co(function* (t) {
  const models = [{ id: 'a' }, { id: 'b' }]
  let timesUpdated = 0
  let timesSaved = 0

  const user = {}
  const handlers = []
  const bot = {
    receive: co(function* () {
      // doesn't matter what we're receiving
      for (let i = 0; i < handlers.length; i++) {
        yield handlers[i]({ user })
      }
    }),
    send: co(function* () {
      timesUpdated++
    }),
    users: {
      save: () => timesSaved++
    },
    addReceiveHandler: function (handler) {
      handlers.push(handler)
      return () => handlers.filter(h => h !== handler)
    }
  }

  let stop = requireModels(models)(bot)
  yield bot.receive()
  t.equal(timesUpdated, 1)
  t.equal(timesSaved, 1)

  yield bot.receive()
  t.equal(timesUpdated, 1)
  t.equal(timesSaved, 1)

  // restart
  stop()
  stop = requireModels(models.reverse())(bot)
  yield bot.receive()
  t.equal(timesUpdated, 1)
  t.equal(timesSaved, 1)

  stop()
  models.push({ id: 'c' })
  stop = requireModels(models)(bot)
  yield bot.receive()
  t.equal(timesUpdated, 2)
  t.equal(timesSaved, 2)

  t.end()
}))
