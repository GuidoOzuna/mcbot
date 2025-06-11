const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const minecraftData = require('minecraft-data');

module.exports = function setupMovement(bot) {
  bot.loadPlugin(pathfinder);

  bot.once('spawn', () => {
    console.log(`✅ ${bot.username} ha iniciado sesión en el servidor.`);
    const mcData = minecraftData(bot.version);
    bot.pathfinder.setMovements(new Movements(bot, mcData));

    startPosition = bot.entity.position;
    console.log(`Posición inicial del bot:`, startPosition);
  });

  let startPosition = null;
  let movementInterval = null;

  function moveWithinRadius(radio) {
    if (!bot.entity || !startPosition) return;

    console.log(`Moviendo bot dentro de un radio de ${radio} bloques.`);

    const x = Math.floor(startPosition.x) + Math.floor((Math.random() - 0.5) * radio * 2);
    const z = Math.floor(startPosition.z) + Math.floor((Math.random() - 0.5) * radio * 2);
    const y = startPosition.y;

    const activeGoal = new goals.GoalNear(x, y, z, 1);
    bot.pathfinder.setGoal(activeGoal);
  }

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    console.log(`Mensaje recibido de ${username}: ${message}`);

    const args = message.split('/');
    if (args.length < 2) return;

    const targetBotName = args[0];
    const command = args[1];

    if (targetBotName === bot.username) {
      if (command === 'stop') {
        clearInterval(movementInterval);
        movementInterval = null;
        sendWhisper(username, `${bot.username} ha detenido el movimiento.`);
      } else {
        const radio = parseInt(command);
        if (!isNaN(radio)) {
          if (movementInterval) clearInterval(movementInterval);
          movementInterval = setInterval(() => moveWithinRadius(radio), 10000);
          sendWhisper(username, `${bot.username} se mueve en un radio de ${radio} bloques.`);
        } else {
          sendWhisper(username, `Comando inválido. Usa ${bot.username}/(radio) o ${bot.username}/stop.`);
        }
      }
    }
  });

  function sendWhisper(username, message) {
    setTimeout(() => bot.chat(`/msg ${username} ${message}`), 500);
  }

  bot.once('spawn', () => {
    console.log(bot.pathfinder);
  });
};