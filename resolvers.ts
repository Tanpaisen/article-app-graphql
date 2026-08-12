import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
    Query: {
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
        },

        getDetailCategories: async (_, args) => {
            const category = await Category.findOne({
                deleted: false,
                _id: args.id
            })
            return category;
        },
        getListCategories: async (_, args) => {
            const categories = await Category.find({
                deleted: false
            });
            return categories;
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
    },

    Article: {
        category: async (article) => {
            const category = await Category.findOne({
                _id: article.categoryId,
                deleted: false
            });
            return category;
        }
    }
}