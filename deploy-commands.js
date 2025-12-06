// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

//Discord gets notified about your commands by this file. It updates or registers your server's slash commands.

//importing package
import { REST, Routes } from 'discord.js';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
const { clientId, guildId, token } = config;

// loading command data for each one
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
  const module = await import(`./commands/${file}`);
  commands.push(module.data.toJSON());
}
// Use the bot token to create a REST client.
const rest = new REST({ version: '10' }).setToken(token);

// deploy the instructions on a certain guild (server).
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
