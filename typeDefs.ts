export const typeDefs = 
    `#graphql
    type Article {
        id: ID,
        title: String,
        avatar: String,
        description: String
    }
    input ArticleInput {
        title: String,
        avatar: String,
        description: String
    }
    type Mutation {
        createArticle(input: ArticleInput): Article
        deleteArticle(id: ID): String
    }
    type Query {
        hello: String
        getListArticles: [Article]
        getDetailArticle(id: ID): Article
    }
`;
