const fs = require('fs');

module.exports = function setupChat(bot) {
  const jugadoresDentro = new Set();

  const consejos = [
    "recuerda establecer tu punto de reaparición colocando una cama en tu refugio.",
    "utiliza herramientas encantadas para mejorar tu eficiencia en la recolección de recursos.",
    "explorar cuevas puede ser peligroso. No olvides llevar suficientes antorchas.",
    "el comercio con aldeanos puede ayudarte a obtener recursos valiosos.",
    "mantente alerta ante los Creepers, pueden aparecer cuando menos lo esperas.",
    "cocinar alimentos aumenta su valor nutricional y mejora tu supervivencia.",
    "si buscas diamantes, la minería en rama es una técnica efectiva.",
    "un refugio seguro debe contar con puertas y una buena iluminación.",
    "para viajar largas distancias sin perderte, un mapa puede ser de gran utilidad.",
    "no olvides reforzar tu armadura antes de enfrentar enemigos poderosos."
  ];

  bot.on('time', () => {
    Object.values(bot.players).forEach(player => {
      if (player.username !== bot.username && player.entity) {
        const distance = bot.entity.position.distanceTo(player.entity.position);

        if (distance <= 3 && !jugadoresDentro.has(player.username)) {
          jugadoresDentro.add(player.username);
          setTimeout(() => jugadoresDentro.delete(player.username), 10000); // Evita spam.

          const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
          bot.whisper(player.username, `Hola ${player.username}, ${consejoAleatorio}`);
        }
      }
    });
  });

  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.on('line', line => {
    if (!bot.entity) return console.log('Bot no conectado aún.');
    bot.chat(line);
  });
};