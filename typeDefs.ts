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
    type Category {
        id: ID,
        title: String,
        avatar: String,
    }
    type Mutation {
        createArticle(input: ArticleInput): Article
        deleteArticle(id: ID): String
        updateArticle(id: ID, input: ArticleInput): Article
    }
    type Query {
        hello: String
        getListArticles: [Article]
        getDetailArticle(id: ID): Article

        getListCategories: [Category]
    }
`;
