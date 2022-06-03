const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'verify',
	async execute(client, message, args){
        if(!message.member.roles.cache.some(r => r.name === "〘 🔧 〙Weryfikacja Permisje 𓆃")) return message.reply('Nie możesz tego użyć!')
		message.delete();
		if (!args[0]) return message.channel.send('Złe użycie, poprawne to `<nazwa użytkownika || id>').then((m) => m.delete({ timeout: 5000 }));

            const roleId = "867193388066275348"

		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.id === roleId.toString().replace(/[^\w\s]/gi, '')));

			const alreadyHasRole = member._roles.includes(roleName.id);

			if (alreadyHasRole) return message.channel.send('Ale ten ziom jest zweryfikowany tego typu').then((m) => m.delete({ timeout: 5000 }));

			const embed = new MessageEmbed()
				.setTitle(`Weryfikacja ${member}`)
				.setDescription(`${message.author} pomyślnie zweryfikowano osobnika: ${member.user}`)
				.setColor('f3f3f3')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(new Date().toLocaleString());

			return member.roles.add(roleName).then(() => message.channel.send(embed));
		} catch (e) {
			return message.channel.send('Spróbuj ponownie').then((m) => m.delete({ timeout: 5000 }));
		}
	},
};