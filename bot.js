const Discord = require("discord.js"); //baixar a lib
const client = new Discord.Client(); 
const config = require("./config.json");
const links = require("./links.json");


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`); 
  client.user.setPresence({game: {name: 'testando 5', url: 'http://www.twitch.tv/retro_gaming_show', type: 1}});
    //0 = Jogando
    //  1 = Transmitindo
    //  2 = Ouvindo
    //  3 = Assistindo
});

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();
  
  // coamdno ping
  if(comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }

  if(comando == "procurar"){

    const m = await message.channel.send("Testando 1, 2, 3")
    
    args2 = JSON.stringify(args).replace('[', '').replace(']', '').replace(/"/g, ''). replace(/,/g ," ");

    console.log(args2)

    for(var i = 0; i <= links.sites.length; i++){

      if(links.sites[i].nome.startsWith(args2)){

        await message.author.send(links.sites[i].nome);
        resposta = await message.author.send(links.sites[i].link);
        if(resposta == links.sites[i].link) return;

      }

    }

  }
  
});
client.login(process.env.BOT_TOKEN || config.token);