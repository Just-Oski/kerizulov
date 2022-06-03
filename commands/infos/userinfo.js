const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    category: 'Infos',
    aliases: ['profile'],
    Usage: '<mention>',
    description: 'Some information about user.',
    async execute(client, message, args){
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;


        const embed = new MessageEmbed()
            .setTitle(`📜 ${user.user.username} statystyki!`)
            .setColor(`#43e087`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .setFooter('Wiadomość została wygenerowana automatycznie.', message.guild.iconURL({ dynamic: true }))
            .addFields(
                {
                    name: "Nazwa: ",
                    value: user.user.username,
                    inline: true
                },
                {
                    name: "#️⃣ Tag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: "📢 Ping: ",
                    value: `<@${user.user.id}>`,
                    inline: true
                },
                {
                    name: 'Link do awatara: ',
                    value: `[Kliknij tutaj](${user.user.displayAvatarURL()})`
                },
                {
                    name: 'Konto utworzono: ',
                    value: user.user.createdAt.toLocaleDateString("pl-pl"),
                    inline: true
                },
                {
                    name: 'Dołączono na serwer: ',
                    value: user.joinedAt.toLocaleDateString("pl-pl"),
                    inline: true
                },
            )

        await message.channel.send(embed)
    }

}