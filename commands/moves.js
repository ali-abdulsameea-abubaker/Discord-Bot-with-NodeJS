// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

// Bring in the necessary packages
import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';

// definding moeves command
export const data = new SlashCommandBuilder()
  .setName('moves')
  .setDescription('Display a Pokémons first N moves (N must be a number).')
  .addStringOption(opt => opt.setName('pokemon').setDescription('the pokemon name').setRequired(true))
  .addIntegerOption(opt => opt.setName('limit').setDescription('how many moves (1–30) to display').setRequired(true));

  // excute function whyen user run
export async function execute(interaction) {
  const pokemon = interaction.options.getString('pokemon').toLowerCase();
  let limit = interaction.options.getInteger('limit');
  if (limit < 1) limit = 1;
  if (limit > 30) limit = 30;

  await interaction.deferReply();
  try {
    const res = await fetch(`secret`);
    if (!res.ok) return interaction.editReply(`${pokemon} cant be found.`);
    const d = await res.json();
    const moves = d.moves.slice(0, limit).map(m => m.move.name);
    await interaction.editReply(`**${d.name}** — first ${moves.length} moves: ${moves.join(', ')}`);
  } catch (err) {
    console.error(err);
    //error handling
    await interaction.editReply('Fetching errors occur for moves');
  }
}
