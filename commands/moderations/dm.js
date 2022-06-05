
const {
  Permissions: { FLAGS },
} = require("discord.js");

const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "dm",
    description: "DM a user in the guild",
    category: "moderations",
    aliases: [],
    usage: '<user> <message>',
    // botPermissions: [FLAGS.MANAGE_MESSAGES],
    // userPermissions: [FLAGS.MANAGE_MESSAGES],
    async execute(bot, message, args) {
      message.delete({function: 1000});
      if(!message.member.roles.cache.some(r => r.name === "〘 🔒 〙Administrator 𓆃")) return message.reply('Nie możesz tego użyć!')
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `Nie zapingowałeś osoby, lub podałeś złe ID użytkownika!`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("Nie podałeś żadnej wiadomości!");

          let embed = new MessageEmbed()
          .setTitle(`Nowa wiadomość od administratora ${message.author.username}`)
          .setDescription(args.slice(1).join(" "))
          .setFooter(`Wiadomość wysłana z serwera ${message.guild.name}`)
          .setColor('9e0803')

      user.user
        .send(embed)
        .catch(() => message.channel.send("Nie mogę tej osobie wysłać wiadomości!"))
        .then(() => message.channel.send(`Wysłano wiadomość do ${user.user.tag}`));
    },
  };