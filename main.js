"use strict";

// discord.js FileStream モジュールのインポート
const Discord = require("discord.js");
const fs = require("fs");
// Discord Clientのインスタンス作成
const client = new Discord.Client();
// トークンの用意
const token = "";

//プレフィックス設定
const prefix = "-";

//コマンドの検索
client.commands = new Discord.Collection();

//jsファイルのみ読み込み
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

//コマンドファイルの列挙
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

//処理待ち
client.once("ready", () => {
  console.log("ready...");
});
//Bot自身の発言を無視する
client.on("message", (message) => {
  //プレフィックスがなかった場合には実行しない
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  //文字を全て小文字に
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "play") {
    client.commands.get("play").execute(message, args);
  } else if (command === "leave") {
    client.commands.get("leave").execute(message, args);
  }
});
client.login(token);
