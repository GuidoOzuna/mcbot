const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'WorldFuneral.aternos.me',
  port: 44396,
  username: 'Merlon',
  version: '1.20.1'
});

// Reconexión automática
bot.on('end', () => {
  console.log('Bot desconectado, intentando reconectar en 5 segundos...');
  setTimeout(() => bot.connect(), 5000);
});

module.exports = bot;