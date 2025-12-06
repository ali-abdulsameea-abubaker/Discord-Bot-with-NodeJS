// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

// Bring in the necessary packages
import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';

// slash command
export const data = new SlashCommandBuilder()
  .setName('pokemon')
  .setDescription('Get the basic information for Pokémon (id or name).')
  .addStringOption(opt => opt.setName('name').setDescription('name or id of Pokémon').setRequired(true));

//excute function when user run /pokemon slash
export async function execute(interaction) {
  const name = interaction.options.getString('name').toLowerCase();
  await interaction.deferReply();
  // validate user input
  try {
    const res = await fetch(`secret`);
    if (!res.ok) {
      return interaction.editReply('[${name} cannot be found.');
    }
    const data = await res.json();
    const types = data.types.map(t => t.type.name).join(', ');
    const stats = data.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('\n');
    const msg = `**${data.name}** (ID: ${data.id})
Types: ${types}
Height: ${data.height} | Weight: ${data.weight}
Base stats:
${stats}
Top moves (first 6):
${data.moves.slice(0, 6).map(m => m.move.name).join(', ')}`;
    await interaction.editReply(msg);
  } catch (err) {
    console.error(err);
    // error handling
    await interaction.editReply('Data fetching error.');
  }
}
