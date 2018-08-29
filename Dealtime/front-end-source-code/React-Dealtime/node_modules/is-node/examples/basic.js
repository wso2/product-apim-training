// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
const $isNode = require('../');

if ($isNode) {
  console.log('This is a node process.');
} else {
  console.log('What kind of witchcraft is this? This is not a node process.');
}
