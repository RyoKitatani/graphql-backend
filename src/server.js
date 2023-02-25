const { ApolloServer, gql } = require("apollo-server");

// GraphQLスキーマま定義
const typeDefs = gql`
  type Query {
    info: string!
  }
`

// リゾルバ関数
const resolvers = {
  Query: {
    info: () => "HackerNewsクローン",
  }
}
