const bcrypt = require("bcryptjs");
const jwt = require("json")

APP_SECRET = "Graphql"

// ユーザーに新規登録のリゾルバ
async function signup(parent, args, context) {
  // パスワードの設定
  const password = await bcrypt.hash(args.password, 10);
  // ユーザーの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({userId: user.id }, APP_SECRET);

  return {
    token,
    user
  }
}
