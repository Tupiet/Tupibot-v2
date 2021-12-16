const fs = require('fs') // Declarem el mòdul fs, necessari per accedir a fitxers
const { Client, Collection, Intents } = require('discord.js')
const token = process.env.TOKEN // Declarem el token del bot

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }) // Declarem el client
client.commands = new Collection() // Declarem la collection de comandes
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')) // Aquí carreguem les comandes, que estan en el directori commands

for (const file of commandFiles) { // Per cada fitxer de comanda
	const command = require(`./commands/${file}`) // Carreguem el fitxer
	// Afegim el fitxer a la collection de comandes
	// El primer valor és el key, que és el nom. El segon és el valor, que és la comanda en sí
	client.commands.set(command.name, command) 
}

client.once('ready', () => {
	console.log('Hey, I\'m ready!')
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return

	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		await interaction.reply({ content: 'There was a problem running that command.', ephemeral: true })
	}

});

client.login(token)