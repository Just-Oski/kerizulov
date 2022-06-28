const { MessageEmbed } = require('discord.js');
const dotenv = require("dotenv").config("./.env")

module.exports = {
	name: 'akceptuj',
	async execute(client, message, args){
        if(!message.member.roles.cache.some(r => r.name === "👑│Zarząd San Andreas Medical Services")) return message.reply('Nie możesz tego użyć!')
		message.delete();
		if (!args[0]) return message.channel.send('Złe użycie, poprawne to `<nazwa użytkownika || id>').then((m) => m.delete({ timeout: 5000 }));

            const roleId = "989951896175407195"
			const zeroPad = (num, places) => String(num).padStart(places, '0')
		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const roleName = message.guild.roles.cache.find((r) => (r.id === roleId.toString().replace(/[^\w\s]/gi, '')))
			const alreadyHasRole = member._roles.includes(roleName.id);

			const wem = new MessageEmbed()
			.setTitle('Błąd')
			.setDescription('Osoba została już przyjęta.')

			if (alreadyHasRole) return message.channel.send(wem);

			var currentdate = new Date(); 
			var datetime = (zeroPad(currentdate.getHours()+2, 2)) + ":" 
			+ zeroPad(currentdate.getMinutes(), 2) + " " 
			+ zeroPad(currentdate.getDate(), 2) + "."
			+ zeroPad((currentdate.getMonth()+1), 2) + "." 
			+ currentdate.getFullYear()

			const embed = new MessageEmbed()
				.setTitle(`Twoje podanie do San Andreas Medical Department zostało rozpatrzone pozytywnie! ✅`)
				.setDescription(`> Zgłoś się do kogoś z zarządu po rekrutację głosową na kanale <#987432468565082133>, po której zostanie stwierdzony twój poziom MedRP i zostanie przydzielona odpowiednia ranga.`)
				.setColor('6cf542')
				
			return member.roles.add(roleName, `Podanie zaakceptowane przez ${message.author.username}`).then(() => 
			message.channel.edit({ name: `pytanie-${member.user.username}` })
			.catch(console.error),
			message.channel.send('Zarząd San Andreas Medical Department, z przyjemnością informuję, że:'),
			message.channel.send(embed));
		} catch (e) {
			const logembed = new MessageEmbed()
			.setTitle(`Logi`)
			.setColor('34ebd8')
			.setDescription(e)
			.setFooter(datetime);
			return message.channel.send(`Najprawdopodobniej, bot zajebał fikołka\nLub osoba wyszła z serwera.`).then(console.log(e)),
			client.channels.cache.get("991053438404149280").send(logembed);
		}
	},
};