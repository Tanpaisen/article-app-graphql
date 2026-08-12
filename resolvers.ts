import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => 'Hello, World!',
        articles: async () => {
            const articles = await Article.find({
                deleted: false
            });
            return articles;
        }
    }
}