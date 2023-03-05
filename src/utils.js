
const jwt = require("jsonwebtoken")
APP_SECRET = "Graphql"

// トークンを複合するための関数
function getTokenPayload(token) {
  // トークン化された物の前の情報(user.id)を複合する
  return jwt.verify(token, APP_SECRET)
}

// ユーザーIDを取得する関数
function getUserID(req, authToken) {
  if (req) {
    // ヘッダーを確認する。認証権限があるかの確認
    const authHeader = req.headers.authorization;
    // 権限がある場合
    if (authHeader) {
      const token = authHeader.replace("Bearer", "")
      if (!token) {
        throw new Error("トークンが見つか利ませんでした。");
      }
      // そのトークンを複合する。
      const {userId} = getTokenPayload(token);
      return userId
    }
  } else if (authToken) {
    const {userId} = getTokenPayload(authToken);
    return userId
  }

  throw new Error("認証権限があありません");
}


module.exports = {
  APP_SECRET,
  getUserID,
};
