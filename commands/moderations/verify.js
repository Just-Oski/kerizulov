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

			var d = new Date,
			dformat = [d.getMonth()+1,
			d.getDate(),
			d.getFullYear()].join('/')+' '+
			[d.getHours()+2,
			d.getMinutes(),
			d.getSeconds()].join(':');

			const embed = new MessageEmbed()
				.setTitle(`Weryfikacja ${member.username}`)
				.setDescription(`${message.author} pomyślnie zweryfikował: ${member.user}`)
				.setColor('6cf542')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(d);

			return member.roles.add(roleName).then(() => 
			message.channel.send(embed)),
			message.channel.edit({ name: `zweryfikowany-${member.username}` })
			.then(console.log)
			.catch(console.error);;
		} catch (e) {
			return message.channel.send('Spróbuj ponownie').then((m) => m.delete({ timeout: 5000 }));
		}
	},
};