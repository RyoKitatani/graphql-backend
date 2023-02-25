const { ApolloServer, gql } = require("apollo-server");

// GraphQLスキーマま定義
const typeDefs = gql`
  type Query {
    info: String!
  }
`

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
  }
}

// アポロサーバーのインスタンス化
const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({url}) => console.log(`${url}でサーバーを起動中`))
