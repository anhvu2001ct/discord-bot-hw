import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('print')
		.setDescription('Choose message to print')
		.addStringOption(option => option
			.setName("message")
			.setDescription("Choose options")
			.setRequired(true)
			.addChoices(
				{ name: "vu", value: "nguyen"},
				{ name: "duy", value: "dang"},
			)
		),
	async execute(interaction: CommandInteraction) {
		const {options} = interaction;
		await interaction.reply({
			content: options.getString("message")!.toString(),
			ephemeral: true,
		});
	}
};
