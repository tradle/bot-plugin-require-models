
# @tradle/bot-require-models

make sure your users are up to date with your latest models

## Usage 

```js
// require your models
const requireModels = require('@tradle/bot-require-models')
// the models which will be sent to your user in a tradle.ModelsPack
// typically, these will be models developed by you in the course
// of implementing your bot's behavior
const mymodels = require('./mymodels')

module.exports = function myStrategy (bot) {
  bot.use(requireModels(mymodels))
  // your code..
}

```
