"use strict";

// discord.js FileStream モジュールのインポート
const Discord = require("discord.js");
// Discord Clientのインスタンス作成
const client = new Discord.Client();
// トークンの用意
const token = "";

//処理待ち
client.on("ready", () => {
  console.log("ready...");
});
//Bot自身の発言を無視する
client.on("message", (message) => {
  if (message.author.bot) {
    return;
  }
});
client.login(token);
