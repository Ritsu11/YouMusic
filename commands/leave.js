module.exports = {
  name: "leave",
  description: "botの停止、退出",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send("再生を停止します");

    //チャンネルから退出させる
    await voiceChannel.leave();
    await message.channel.send("チャンネルから退出しました ");
  },
};
