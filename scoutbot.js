\\ Log Bot Client
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.on('ready', () => {
    client.user.setPresence({ game: { name: 'your commands! |help', type: 2 } });
    console.log(`Logged in as ${client.user.tag}!`);
  }); 
\\ Moderation
client.on("message", message => {
    if (message.content.startsWith("|kick")) {
        if (message.author.bot) return;
        console.log("Somebody just tried to kick a member.")
        var member= message.mentions.members.first();
        if (!message.member.permissions.has(`KICK_MEMBERS`)) return message.channel.send(`You don\'t have permission to kick members.`);
        if(message.mentions.users.size === 0) return message.channel.send('Please specify a member to kick.')
        member.kick().then((member) => {
            message.channel.send("Kicked " + member.displayName + ".");
        }).catch(() => {
            message.channel.send("The command failed! You may not have the right permission or the user is higher than me.");
        });
    }
    \\ Core Commands
    if (message.content === '|help') {
        if (message.author.bot) return;
        console.log("Somebody just used the help command.")
        message.channel.send(`Link to the command list page: http://scoutbot.spikeyscout.xyz/commands/`)
    }
    if (message.content === '|invite') {
        if (message.author.bot) return;
        console.log("Somebody just used the invite command.")
        message.channel.send("Bot Invite: https://discordapp.com/api/oauth2/authorize?client_id=439205929972531203&permissions=80014531&scope=bot")
    }
\\ Stats
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
    if (message.content.startsWith("|info")) {
        console.log('Somebody just the info command.')
        message.channel.send({embed: {
            color: 7506394,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "open source n shit!",
            url: "https://github.com/Discord-ScoutBot",
            description: "Scout-Bot is a Discord Bot run by SpikeyScout#5617!",
            fields: [{
                name: "Offical Discord Server",
                value: "As of right now, there is no Discord server. Please contact the DiscordTag above if you have any problems."
              },
              {
                name: "Commands and Stats",
                value: "Please visit the [help site](http://scoutbot.spikeyscout.xyz/commands)for commands, and for stats type ***|stats***!"
              },
              {
                name: "Scout-Bot's Website!",
                value: 'http://scoutbot.spikeyscout.xyz/. *Currently a Work-in-Progress.*'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Scout-Bot v1.3 - the robot takeover of the world is nigh"
            }
          }
        });
    }
\\ Math/Dice rolling Commands
    if (message.content.startsWith("|roll")) {
    console.log('Somebody just used the roll command.')
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      message.channel.send("Rolling 1-100!")
      message.reply(`you rolled a ${getRandomInt(100)}! `)
    }
    if (message.content.startsWith("|iq")) {
    console.log('Somebody just used the iq command.')
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
    }
    message.reply(`your IQ is ${getRandomInt(100)}!`);
  }
  if (message.content.startsWith("|d20")) {
  console.log('Someone just rolled 20!')
  function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
  }
  message.channel.send("Rolling 1-20!")
  message.reply(`you rolled a ${getRandomInt(100)}! `)
}
});
client.login(config.token)
\\ you thought you could take the token but you cant ...


\\ ahaahahahaha messy code !
