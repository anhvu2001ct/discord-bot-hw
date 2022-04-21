"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
module.exports = {
    data: new builders_1.SlashCommandBuilder()
        .setName('print')
        .setDescription('Choose message to print')
        .addStringOption(option => option
        .setName("message")
        .setDescription("Choose options")
        .setRequired(true)
        .addChoices({ name: "vu", value: "nguyen" }, { name: "duy", value: "dang" })),
    async execute(interaction) {
        const { options } = interaction;
        await interaction.reply({
            content: options.getString("message").toString(),
            ephemeral: true,
        });
    }
};
