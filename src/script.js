// データベースにアクセスするためのクライアントライブラリ
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "udemyでgraphqlを学ぶ",
      url: "https://coeteco.jp/campus"
    },
  });
  const allLink = await prisma.link.findMany();
  console.log(allLink)
}

main()
.catch((e) =>{
  // エラーのキャッチ
  throw e;
})
.finally(async() => {
  // データベースを閉じる
  prisma.$disconnect;
})
