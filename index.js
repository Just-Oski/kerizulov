const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone', intents: [
    discord.Intents.GUILD_MEMBERS, 
    discord.Intents.GUILD_MESSAGES, 
    discord.Intents.DIRECT_MESSAGES,
    discord.Intents.GUILD_MESSAGE_TYPING] });

const { MessageEmbed } = require(`discord.js`)


client.config = require('./bot');
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

client.login(client.config.discord.token);