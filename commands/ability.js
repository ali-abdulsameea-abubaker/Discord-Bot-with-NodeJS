// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.


// Bring in the necessary packages
import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';

// Explain and define what the slash command is.
export const data = new SlashCommandBuilder()
  .setName('ability')
  .setDescription('Get the info for a Pokémon ability.')
  .addStringOption(opt => opt.setName('name').setDescription('ability name').setRequired(true));

  // When a user calls /ability, the method is executed.
export async function execute(interaction) {
  const name = interaction.options.getString('name').toLowerCase();
  await interaction.deferReply();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/ability/${encodeURIComponent(name)}`);
    if (!res.ok) return interaction.editReply(`${name} cannot be found.`);
    // Converting API response to JSON
    const d = await res.json();
    const effect = d.effect_entries.find(e => e.language.name === 'en')?.short_effect ?? 'No effect text.';
    const pokes = d.pokemon.slice(0,6).map(p => p.pokemon.name).join(', ');
    const msg = `**Ability: ${d.name}**
Effect: ${effect}
Pokémon with this ability (sample): ${pokes}`;
    await interaction.editReply(msg);
  } catch (err) {
    console.error(err);
    //error message
    await interaction.editReply('ability error found');
  }
}
