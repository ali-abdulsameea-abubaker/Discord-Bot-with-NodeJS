// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

// Bring in the necessary packages
import fetch from 'node-fetch';
import { SlashCommandBuilder } from 'discord.js';

// Define the metadata for the slash command.
export const data = new SlashCommandBuilder()
  .setName('compare')
  .setDescription('The Compare base stats for each two Pokémon.')
  .addStringOption(opt => opt.setName('pokemon1').setDescription('1st pokemon name').setRequired(true))
  .addStringOption(opt => opt.setName('pokemon2').setDescription('2nd pokemon name').setRequired(true));

  // A helper function that converts Pokémon metrics into a string that can be read by humans
function formatStats(obj) {
  return obj.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('\n');
}
// Main execute function
export async function execute(interaction) {
  const p1 = interaction.options.getString('pokemon1').toLowerCase();
  const p2 = interaction.options.getString('pokemon2').toLowerCase();
  await interaction.deferReply();
  try {
    const [r1, r2] = await Promise.all([
      fetch(`secret`),
      fetch(`secret`)
    ]);
    if (!r1.ok) return interaction.editReply('${p1} cant be found.');
    if (!r2.ok) return interaction.editReply('${p2} cannot be found.');
    const [d1, d2] = await Promise.all([r1.json(), r2.json()]);
    let reply = `**Compare ${d1.name} (ID ${d1.id}) vs ${d2.name} (ID ${d2.id})**\n\n`;
    const names = d1.stats.map(s=>s.stat.name);
    reply += names.map(name => {
      const s1 = d1.stats.find(s => s.stat.name === name).base_stat;
      const s2 = d2.stats.find(s => s.stat.name === name).base_stat;
      const winner = s1 === s2 ? 'Tie' : (s1 > s2 ? d1.name : d2.name);
      return `${name}: ${d1.name} ${s1} — ${d2.name} ${s2}  → ${winner}`;
    }).join('\n');
    await interaction.editReply(reply);
  } catch (err) {
    console.error(err);
    //error handling
    await interaction.editReply('comparing error occur for this pokemon');
  }
}
