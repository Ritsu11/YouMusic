const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
  name: "play",
  description: "plays video a from youtube",
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    //チャンネルにいるか確認
    if (!voiceChannel) {
      return message.channel.send(
        "ボイスチャンネルに入室した状態でコマンドを実行してください"
      );
    }

    //権限があるか確認
    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT"))
      return message.channel.send("接続権限がありません");
    if (!permissions.has("SPEAK"))
      return message.channel.send("発言権限がありません");
    if (!args.length) return message.channel.send("URLを指定してください");

    //URLバリデーション
    const validURL = (str) => {
      let regex =
        /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

      if (!regex.test(str)) {
        return false;
      } else {
        return true;
      }
    };

    //途中で指定された場合強制終了、新たなのを再生
    if (validURL(args[0])) {
      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], { filte: "audioonly" });

      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        voiceChannel.leave();
        message.channel.send("チャンネルから退出");
      });

      await message.reply(`:thumbsup: ${video.title} を再生中`);

      return;
    }

    const connection = await voiceChannel.join();

    //動画を検索
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      //動画が見つかったかの判定
      return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
    };

    const video = await videoFinder(args.join(" "));

    if (video) {
      const stream = ytdl(video.url, { filter: "audioonly" });

      //音量設定と再生停止
      connection.play(stream, { seek: 0, volume: 1 }).on("finish", () => {
        //再生終了後強制退出
        voiceChannel.leave();
      });

      await message.reply(`:thumbsup: ${video.title} を再生中`);
    } else {
      message.channel.send("動画が見つかりませんでした");
    }
  },
};
