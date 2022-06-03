module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    usage: '',

    async execute(client, message) {
        message.channel.send(`${client.emotes.success} - Ping: **${client.ws.ping}ms** !`);
    },
};