const { MessageEmbed } = require('discord.js');
const dotenv = require("dotenv").config("./.env")

module.exports = {
	name: 'verify',
	async execute(client, message, args){
        if(!message.member.roles.cache.some(r => r.name === "〘 🔧 〙Weryfikacja Permisje 𓆃")) return message.reply('Nie możesz tego użyć!')
		message.delete();
		if (!args[0]) return message.channel.send('Złe użycie, poprawne to `<nazwa użytkownika || id>').then((m) => m.delete({ timeout: 5000 }));

            const roleId = "982685805560627231" // 867193388066275348
			const roleIdBot = "867193031026409522"
			const zeroPad = (num, places) => String(num).padStart(places, '0')
		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.id === roleId.toString().replace(/[^\w\s]/gi, '')));
			const roleBot = message.guild.roles.cache.find((r) => (r.id === roleIdBot.toString().replace(/[^\w\s]/gi, '')))
			const alreadyHasRole = member._roles.includes(roleName.id);

			let zem = new MessageEmbed()
			.setTitle('<a:police:980176625800974397> Błąd')
			.setDescription('Wypierdalaj od tego bota.')

			let wem = new MessageEmbed()
			.setTitle('<a:police:980176625800974397> Błąd')
			.setDescription('Ale ten ziom jest zweryfikowany tego typu.')

			if (alreadyHasRole) return message.channel.send(wem).then((m) => m.delete({ timeout: 5000 }));
			if (member._roles.includes(roleBot.id)) return message.channel.send(zem)

			var currentdate = new Date(); 
			var datetime = (zeroPad(currentdate.getHours()+2, 2)) + ":" 
			+ zeroPad(currentdate.getMinutes(), 2) + " " 
			+ zeroPad(currentdate.getDate(), 2) + "."
			+ zeroPad((currentdate.getMonth()+1), 2) + "." 
			+ currentdate.getFullYear()

			const embed = new MessageEmbed()
				.setTitle(`Weryfikacja`)
				.setDescription(`${message.author} pomyślnie zweryfikował: ${member.user}`)
				.setColor('6cf542')
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(datetime);
				
			const em = new MessageEmbed()
				.setTitle(`Logi`)
				.setColor('34ebd8')
				.setDescription(`${message.author} pomyślnie zweryfikował: ${member.user}`)
				.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
				.setFooter(datetime);
			return member.roles.add(roleName, `Weryfikacja przez ${message.author.username}`).then(() => 
			message.channel.edit({ name: `zweryfikowany-${member.user.username}` })
			.catch(console.error),
			message.channel.send(embed),
			client.channels.cache.get("867887317003141152").send(em),
			client.channels.cache.get("980875782014525480").send(em));
		} catch (e) {
			const logembed = new MessageEmbed()
			.setTitle(`Logi`)
			.setColor('34ebd8')
			.setDescription(e)
			.setFooter(datetime);
			return message.channel.send('Spróbuj ponownie').then((m) => m.delete({ timeout: 5000 })).then(console.log(e)),
			client.channels.cache.get("980875782014525480").send(logembed);	
		}
	},
};