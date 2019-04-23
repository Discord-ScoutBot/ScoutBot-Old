const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.on('ready', () => {
    client.user.setPresence({ game: { name: 'your commands! |help', type: 2 } });
    console.log(`Logged in as ${client.user.tag}!`);
  });

client.on("message", message => {
    if (message.content.startsWith("|kick")) {
        if (message.author.bot) return;
        console.log("Somebody just tried to kick a member.")
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        if (!message.member.permissions.has(`KICK_MEMBERS`)) return message.channel.send(`You don\'t have permission to kick members.`);
        if(message.mentions.users.size === 0) return message.channel.send('Please specify a member to kick.')
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send("Kicked " + member.displayName + ".");
        }).catch(() => {
             // Failmessage
            message.channel.send("The command failed! You may not have the right permission or the user is higher than me.");
        });
    }
    if (message.content === '|help') {
        if (message.author.bot) return;
        console.log("Somebody just used the help command.")
        message.channel.send(`Link to the command list page: https://discord-scoutbot.github.io/commands/`)
    }
    if (message.content === '|invite') {
        if (message.author.bot) return;
        console.log("Somebody just used the invite command.")
        message.channel.send("Bot Invite: https://discordapp.com/api/oauth2/authorize?client_id=439205929972531203&permissions=80014531&scope=bot")
    }
    if (message.content === '|ping') {
        if (message.author.bot) return;
        console.log("Somebody just used the ping command.")
        message.channel.send('Pinging...')
        .then(msg => {
            msg.edit(`Took ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
    if (message.content.startsWith("|uptime")) {
        console.log('Somebody just used the uptime command.')
        message.channel.send(`I have been up for ${client.uptime * .001} seconds.`)
    }
    if (message.content.startsWith("|serverlist")) {
        console.log('Somebody just used the serverlist command.')
        message.channel.send(`I am in the following servers: ${client.guilds.map(g=>g.name).join('\n')}`)
    }
    if (message.content.startsWith("|info")) {
        console.log('Somebody just the info command.')
        message.channel.send({embed: {
            color: 7506394,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Scout-Bot's Github",
            url: "https://github.com/Discord-ScoutBot",
            description: "Scout-Bot is a Discord Bot run by SpikeyScout#5617!",
            fields: [{
                name: "Offical Discord Server",
                value: "Click [here](https://discord.gg/pPBUYhz) to join!"
              },
              {
                name: "For more info and commands...",
                value: "Type ***|help***! For more stats about the bot, type ***|stats***!"
              },
              {
                name: "Scout-Bot's Website!",
                value: 'Click [here](https://discord-scoutbot.github.io/). **This is an unfished website!**'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Scout-Bot v1.11"
            }
          }
        });
    }
    if (message.content.startsWith("|roll")) {
    console.log('Somebody just used the roll command.')
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      
      message.channel.send(getRandomInt(100));
    }
    if (message.content.startsWith("|iq")) {
    console.log('Somebody just used the iq command.')
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    }
    message.reply('your IQ is...');
    return message.channel.send(getRandomInt(300));
  }
    if (message.content.startsWith("alexa play despacito")) {
    console.log('this is so sad, alexa play despacito')
    message.channel.send("***THIS IS SO SAD*** ɴᴏᴡ ᴘʟᴀʏɪɴɢ: Despacito  ───────────⚪────── ◄◄⠀▐▐ ⠀►►⠀⠀ ⠀ 𝟸:𝟷𝟾 / 𝟹:𝟻𝟼 ⠀ ───○ 🔊⠀ ᴴᴰ ⚙️ | <https://www.youtube.com/watch?v=kJQP7kiw5Fk>")
    }
});
client.login(config.token)
// messiest code ever xd
