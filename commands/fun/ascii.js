const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",
    category: 'Fun',
    aliases: [],
    usage : "<message>",


    async execute(client, message, args){
        if(!args[0]) return message.channel.send('Podaj jakiś tekst.');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Coś jest źle');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Podaj jakiś tekst poniżej 2000 słów.')

            message.channel.send('```' + data + '```')
        })
    }
}