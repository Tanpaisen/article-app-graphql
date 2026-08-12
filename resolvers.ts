import Article from "./models/article.model";

export const resolvers = {
    Query: {
        hello: () => 'Hello, World!',
        getListArticles: async () => {
            const articles = await Article.find({
                deleted: false
            });
            return articles;
        },
        getDetailArticle: async (_,args) => {
            const article = await Article.findOne({
                deleted: false,
                _id: args.id
            })
            return article;
        }
    }
}