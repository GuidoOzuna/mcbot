const bot = require('./mcbot');
const setupMovement = require('./movimiento');
const setupChat = require('./chat');

setupMovement(bot);
setupChat(bot);