const Discord = require('discord.js')

module.exports = {
    name: 'iq',
    category: "fun",
    description: "Iq test",
    aliases: ['testnaiq'],
    async execute(client, message, args){
try {

    const iq = Math.floor(Math.random() * 226);
    const embed = new Discord.MessageEmbed()
      .setTitle(":brain: IQ Test:")
      .setDescription(":bulb: " + message.author.username + " IQ: `" + iq + "`")
      .setColor(`RANDOM`)
      .setTimestamp()
    message.channel.send(embed);
    
    } catch (err) {
        message.channel.send({embed: {
          color: 16734039,
          description: "Wyskoczył błąd... :cry:"
        }})
        console.log(err)
      }
    }
    }


