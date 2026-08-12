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
        getDetailArticle: async (_, args) => {
            const article = await Article.findOne({
                deleted: false,
                _id: args.id
            })
            return article;
        }
    },

    Mutation: {
        createArticle: async (_, args) => {
            const data = {
                title: args.input.title,
                avatar: args.input.avatar,
                description: args.input.description,
            }
            const article = new Article(data);
            await article.save();
            return article;
        },
        deleteArticle: async (_, args) => {
            await Article.updateOne({
                _id: args.id,
                deleted: false
            }, {
                deleted: true,
            })
            return "Article deleted successfully";
        },
        updateArticle: async (_, args) => {
            const data = {
                title: args.input.title,
                avatar: args.input.avatar,
                description: args.input.description,
            };
            await Article.updateOne(
                {
                    _id: args.id,
                    deleted: false
                },
                { $set: data },
            );
            const article = await Article.findOne({
                _id: args.id,
                deleted: false
            })
            return article;
        }
    }
}