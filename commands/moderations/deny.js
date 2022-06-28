const { MessageEmbed } = require('discord.js');
const dotenv = require("dotenv").config("./.env")

module.exports = {
	name: 'odrzuc',
	async execute(client, message, args){
        if(!message.member.roles.cache.some(r => r.name === "👑│Zarząd San Andreas Medical Services")) return message.reply('Nie możesz tego użyć!')
		message.delete();
			const zeroPad = (num, places) => String(num).padStart(places, '0')
		try {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			var currentdate = new Date(); 
			var datetime = (zeroPad(currentdate.getHours()+2, 2)) + ":" 
			+ zeroPad(currentdate.getMinutes(), 2) + " " 
			+ zeroPad(currentdate.getDate(), 2) + "."
			+ zeroPad((currentdate.getMonth()+1), 2) + "." 
			+ currentdate.getFullYear()

			const embed = new MessageEmbed()
				.setTitle(`Twoje podanie do San Andreas Medical Department zostało rozpatrzone negatywnie! ❌`)
				.setDescription(`> Najprawdopodobnie powodem odrzucenia podania jest:\n• Brak spełnienia wymagań OOC lub IC\n• Niewystarczająco rozpisany list motywacyjny\n• Karalność`)
				.setColor('6cf542')
				
			return message.channel.send('Zarząd San Andreas Medical Department, z przykrością, że:'), message.channel.send(embed);
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