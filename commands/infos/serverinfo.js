const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    category: 'Infos',
    aliases: [],
    Usage: '',
    description: 'Some information about server.',
    async execute(client, message, args){
        let region;
        switch (message.guild.region) {
            case "europe":
                region = '🇪🇺 Europe';
                break;
            case "us-east":
                region = '🇺🇸 us-east'
                break;
            case "us-west":
                region = '🇺🇸 us-west';
                break;
            case "us-south":
                region = '🇺🇸 us-south'
                break;
            case "us-central":
                region = '🇺🇸 us-central'
                break;
        }

        const embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({dynamic : true}))
            .setColor('#43e087')
            .setTitle(`${message.guild.name} statystki!`)
            .setFooter('Wiadomość została wygenerowana automatycznie.', message.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "Owner: ",
                    value: `<@${message.guild.ownerID}>`,
                    inline: true
                },
                {
                    name: "Osób: ",
                    value: `Jest ${message.guild.memberCount} osób!`,
                    inline: true
                },
                {
                    name: "Utworzono: ",
                    value: message.guild.createdAt.toLocaleDateString("pl-pl"),
                    inline: true
                },
                {
                    name: "Liczba ról: ",
                    value: `Jest ${message.guild.roles.cache.size} ról na tym serwerze.`,
                    inline: true,
                },
                {
                    name: `🗺 Region: `,
                    value: region,
                    inline: true
                },
                {
                    name: `Zweryfikowano: `,
                    value: message.guild.verified ? 'Tak' : `Nie`,
                    inline: true
                },
                {
                    name: 'Liczba boostów: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `Jest ${message.guild.premiumSubscriptionCount} boostów` : `Nie ma boostów`,
                    inline: true
                },
                {
                    name: "Emotek: ",
                    value: message.guild.emojis.cache.size >= 1 ? `Jest ${message.guild.emojis.cache.size} emotek!` : 'Nie ma emotek' ,
                    inline: true
                }
            )
        await message.channel.send(embed)
    }

}