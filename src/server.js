const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const {PrismaClient} = require("@prisma/client");
const {getUserID} = require("./utils")

// リゾルバ関係のファイル
const Query = require("./resolvers/Query")
const Mutation = require("./resolvers/Mutation")
const Link = require("./resolvers/Link")
const User = require("./resolvers/User")

const prisma = new PrismaClient();

// リゾルバ関数
const resolvers = {
  Query,
  Mutation,
  Link,
  User
};

// アポロサーバーのインスタンス化
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({req}) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserID(req) : null,
    }
  }
})

server
  .listen()
  .then(({url}) => console.log(`${url}でサーバーを起動中`))
