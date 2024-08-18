const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const userApi = require('../../api/userApi');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Lookup hypixel skyblock user profile.')
		.addStringOption(option =>
			option
				.setName('username')
				.setDescription("User's Minecraft username.")
				.setRequired(true)
		)
		.addStringOption(option =>
			option
				.setName('profile-name')
				.setDescription("Skyblock profile name.")
				.setRequired(true)
				.addChoices(
					{ name: 'Apple', value: 'Apple'},
					{ name: 'Banana', value: 'Banana'},
					{ name: 'Blueberry', value: 'Blueberry'},
					{ name: 'Coconut', value: 'Coconut'},
					{ name: 'Cucumber', value: 'Cucumber'},
					{ name: 'Grapes', value: 'Grapes'},
					{ name: 'Kiwi', value: 'Kiwi'},
					{ name: 'Lime', value: 'Lime'},
					{ name: 'Mango', value: 'Mango'},
					{ name: 'Orange', value: 'Orange'},
					{ name: 'Papaya', value: 'Papaya'},
					{ name: 'Peach', value: 'Peach'},
					{ name: 'Pear', value: 'Pear'},
					{ name: 'Pineapple', value: 'Pineapple'},
					{ name: 'Pomegranate', value: 'Pomegranate'},
					{ name: 'Raspberry', value: 'Raspberry'},
					{ name: 'Strawberry', value: 'Strawberry'},
					{ name: 'Tomato', value: 'Tomato'},
					{ name: 'Watermelon', value: 'Watermelon'},
					{ name: 'Zucchini', value: 'Zucchini'}
				)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const user = interaction.options.getString('username');
		const profile = interaction.options.getString('profile-name')
		const res = 
			await userApi
					.get(`profile/${user}`)
					.catch(error => console.log(error));
		if (!res) {
			await interaction.followUp('Please enter a valid Minecraft username.');
			return;
		}
		const profiles = res.data.profiles;
		const profileIds = Object.keys(profiles);
		let currProfile = null;
		profileIds.forEach((profileId) => {
			const profileData = profiles[profileId];
			if (profileData.cute_name === profile) {
				currProfile = profileId;
				return;
			}
		})
		if (!currProfile) {
			await interaction.followUp(`${user} does not have a profile called ${profile}.`);
		} else {
			const data = profiles[currProfile].data;
			const sbLevel = data.skyblock_level.level;
			const avgSkill = data.skills.averageSkillLevel;
			const skillNames = Object.keys(data.skills.skills);
			const skillData = data.skills.skills;
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(`${user}'s Skyblock Profile Summary`)
				.setDescription(`${profile}`)
				.addFields(
					{ name: 'Skyblock Level', value: sbLevel.toString()},
					{ name: 'Average Skill', value: avgSkill.toString()},
					{ name: '\u200B', value: '\u200B' },
					{ name: 'Farming', value: skillData[skillNames[0]].level.toString(), inline: true },
					{ name: 'Mining', value: skillData[skillNames[1]].level.toString(), inline: true },
					{ name: 'Combat', value: skillData[skillNames[2]].level.toString(), inline: true },
					{ name: 'Foraging', value: skillData[skillNames[3]].level.toString(), inline: true },
					{ name: 'Fishing', value: skillData[skillNames[4]].level.toString(), inline: true },
					{ name: 'Enchanting', value: skillData[skillNames[5]].level.toString(), inline: true },
					{ name: 'Alchemy', value: skillData[skillNames[6]].level.toString(), inline: true },
					{ name: 'Taming', value: skillData[skillNames[7]].level.toString(), inline: true },
					{ name: 'Carpentry', value: skillData[skillNames[8]].level.toString(), inline: true }
				)
				.setTimestamp()
			await interaction.followUp({ embeds: [embed]});
		}
	},
};