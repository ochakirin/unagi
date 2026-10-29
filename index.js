require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// メッセージ内容を取得するためのインテントを指定
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ランダムに選択されるキーワードのリスト
const KEYWORDS = [
  "うなぎ", "やきにく", "すし", "すきやき", "さしみ", 
  "みず", "うどん", "そば", "とんかつ", "とりてん", 
  "やきとり", "めんたい", "あんこう", "なべ", "もつやき", 
  "きゅうり", "つけもの", "びーる", "こーら", "すてーき", 
  "ちゅうか", "ぱすた", "らーめん", "ごはん", "ぱん", 
  "つなかん", "いくら"
];

client.once('ready', () => {
  console.log(`Botがログインしました: ${client.user.tag}`);
});

client.on('messageCreate', message => {
  // Bot自身のメッセージには反応しない
  if (message.author.bot) return;

  // メッセージに「出走」が含まれているか判定
  if (message.content.includes("出走")) {
    // キーワードリストの中からランダムに1つ選択
    const selectedKeyword = KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];
    
    // 返信メッセージの作成
    const replyMessage = 
      "出走宣言しました!頑張ってください。\n" +
      "指定行動は\n" +
      `"${selectedKeyword}"\n` +
      "出走前にプレイする冒険の書とは別の場所に、主人公の名前を指定行動のものにしたデータを作成してください。";
    
    // 元のメッセージに対してリプライで送信
    message.reply(replyMessage);
  }
});

// 環境変数からトークンを取得してログイン
if (process.env.DISCORD_TOKEN) {
  client.login(process.env.DISCORD_TOKEN);
} else {
  console.error("エラー: 環境変数に 'DISCORD_TOKEN' が設定されていません。");
}
