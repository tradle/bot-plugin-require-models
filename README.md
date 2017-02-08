
# @tradle/bot-plugin-require-models

make sure your users have the custom models your bot uses

## Usage 

```js
// require your models
const requireModelsPlugin = require('@tradle/bot-require-models-plugin')
const mymodels = require('./mymodels')

module.exports = function myStrategy (bot) {
  bot.use(requireModelsPlugin(mymodels))

  // your code..
}

```
