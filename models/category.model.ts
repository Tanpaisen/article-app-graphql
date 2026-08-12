import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: String,
    avatar: String,
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date,
}, {
    timestamps: true
});
const Category = mongoose.model('Category', categorySchema, 'categories');

export default Category;