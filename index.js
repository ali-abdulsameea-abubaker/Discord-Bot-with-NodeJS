// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

//The primary bot file is this one. When users use slash commands, it launches the bot, loads commands, and executes them.


//importing some packages
import fs from 'fs';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
// Use config.json to load the configuration values (token).
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const { token } = config;
// Launch a fresh instance of the Discord client.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
//loading all commands from /command
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of commandFiles) {
  const module = await import(`./commands/${file}`);
  client.commands.set(module.data.name, module);
}
// bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});
// Event: Handle interactions (slash commands)
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: 'That command was executed incorrectly.', ephemeral: true });
  }
});

client.login(token);
