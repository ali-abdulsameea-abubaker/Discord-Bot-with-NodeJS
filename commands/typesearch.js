// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.


// importanting package from library
import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';

// Defining /typesearch command
export const data = new SlashCommandBuilder()
  .setName('typesearch')
  .setDescription('Locate Pokémon by generation and type (example, fire, generation-i)')
  .addStringOption(opt => opt.setName('type').setDescription('the type name (example: fire)').setRequired(true))
  .addStringOption(opt => opt.setName('generation').setDescription('generation name (example: generation-i)').setRequired(true));
// excute /typesearch command
export async function execute(interaction) {
  const type = interaction.options.getString('type').toLowerCase();
  const generation = interaction.options.getString('generation').toLowerCase();
  await interaction.deferReply();

  try {
    // Concurrently retrieve type and generation data
    const [typeRes, genRes] = await Promise.all([
      fetch(`secret`),
      fetch(`secret`)
    ]);
    if (!typeRes.ok) return interaction.editReply('${type} type cant be found.');
    if (!genRes.ok) return interaction.editReply('${generation} cant be found.');

    const [typeData, genData] = await Promise.all([typeRes.json(), genRes.json()]);
    const genSet = new Set(genData.pokemon_species.map(s => s.name));
    const matched = typeData.pokemon
      .map(p => p.pokemon.name)
      .filter(name => genSet.has(name))
      .slice(0, 20);

    if (matched.length === 0) {
      return interaction.editReply(`No ${type} Pokémon found in ${generation}.`);
    }
    await interaction.editReply(' the Pokémon of type is **${type}** in **${generation}** (sample up to 20): ${matched.join(', ')}');
  } catch (err) {
    console.error(err);
    //error handling
    await interaction.editReply('There was a type search error.');
  }
}