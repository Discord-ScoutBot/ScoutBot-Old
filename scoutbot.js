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
        message.channel.send(`Usage:
        |(command)
        Commands:
        invite | Gives you an invite link.
        ping | Pings the bot.
        info | Displays info about the bot.
        help | Sends this.
        kick | Kicks the mentioned user.
        stats | Shows stats about the bot.
        serverlist | Lists current server names bot is in. (Will be removed later!)`)
    }
    if (message.content === '|invite') {
        if (message.author.bot) return;
        console.log("Somebody just used the invite command.")
        message.channel.send("**Sorry, the invite isn't ready just yet.**")
    }
    if (message.content === '|ping') {
        if (message.author.bot) return;
        console.log("Somebody just used the ping command.")
        message.channel.send('Pinging...')
        .then(msg => {
            msg.edit(`Took ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
    if (message.content === '|info') {
        if (message.author.bot) return;
        console.log("Somebody just used the info command.")
        message.channel.send('Hold on a second...')
        .then(msg => {
            msg.edit(`Current bot owner: **SpikeyScout#5617**. Type |help for commands. I'm with ${client.guilds.size} guilds and ${client.users.size} users. Current ping is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
        });
    }
    if (message.content.startsWith("|kill")) {
        message.channel.send(`no u`)
    }
    if (message.content.startsWith("|stats")) {
        message.channel.send(`In **${client.guilds.size}** servers with **${client.users.size}** users!`)
    }
    if (message.content.startsWith("|uptime")) {
        message.channel.send(`I have been up for ${client.uptime * .001} seconds.`)
    }
    if (message.content.startsWith("|serverlist")) {
        message.channel.send(`I am in the following servers: ${client.guilds.map(g=>g.name).join('\n')}`)
    }
    if (message.content.startsWith("|embed")) {
        message.channel.send({embed: {
            color: 3447003,
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
                value: "Type ***|help***!"
              },
              {
                name: "Feel free to add me if you have any questions!",
                value: '~~or you can just join the discord server~~'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Scout-Bot"
            }
          }
        });
    }
});
client.login(config.token)
