const { ApolloServer, gql } = require("apollo-server");

// HackerNewsの1つ1つの投稿
let links = [
  {
    id: "link-0",
    description: "udemyでgraphqlを学ぶ",
    url : "https://coeteco.jp/campus"
  }
]

// GraphQLスキーマま定義
const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
    feed: () => links,
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
