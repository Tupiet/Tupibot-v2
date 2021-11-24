const { Client, Intents } = require('discord.js')
const token = process.env.TOKEN

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Hey, I\'m ready!');
});

client.login(token);