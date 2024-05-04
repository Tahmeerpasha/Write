import asyncHandler from "../utils/asyncHandler.js";
import { Blog } from "../models/blog.model.js";
import { Comment } from "../models/comment.model.js";
import { Category } from "../models/category.model.js";
import { Tag } from "../models/tag.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadAssetsOnCloudinary, deleteAssetsFromCloudinary } from "../utils/cloudinary.js";

const createBlog = asyncHandler(async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;
        const assets = req.files.map(file => file.path);
        const author = req.user._id;

        const cloudinaryUploads = [];
        for (const asset of assets) {
            const result = await uploadAssetsOnCloudinary(asset);
            cloudinaryUploads.push(result.secure_url);
        }

        if (!title || !content || !author || !category) {
            return res.status(400).json(new ApiResponse(400, "All fields are required"));
        }

        const blogExists = await Blog.findOne({ title });
        if (blogExists) {
            return res.status(400).json(new ApiResponse(400, "Blog already exists"));
        }

        const existingCategory = await Category.findOne({ name: category });
        if (!existingCategory) {
            return res.status(400).json(new ApiResponse(400, "Category does not exist"));
        }
        // Get the id of all the tags from tag document
        const existingTags = await Tag.find({ name: { $in: tags } });
        if (!existingTags) return res.status(400).json(new ApiResponse(400, "Some tags do not exist"));
        const tagIds = existingTags.map(tag => tag._id);

        const blog = await Blog.create({
            title,
            content,
            author,
            category: existingCategory._id,
            tags: tagIds,
            assets: cloudinaryUploads
        });

        res.status(201).json(new ApiResponse(201, "Blog created", blog));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});


const getBlogs = asyncHandler(async (_, res) => {
    try {
        const blogs = await Blog.find().populate("author").populate("category").populate("tags").populate("comments");
        res.status(200).json(new ApiResponse(200, "Blogs retrieved", blogs));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getBlogById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Blog ID is required"));
        const blog = await Blog.findById(id).populate("author").populate("category").populate("tags").populate("comments");
        if (!blog) return res.status(404).json(new ApiResponse(404, "Blog not found"));
        res.status(200).json(new ApiResponse(200, "Blog retrieved", blog));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const updateBlog = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Blog ID is required"));
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json(new ApiResponse(404, "Blog not found"));
        const assets = req.files.map(file => file.path);
        const { title, content, author, category, tags } = req.body;
        if (title) blog.title = title;
        if (content) blog.content = content;
        if (author) blog.author = author;
        if (category) {
            const existingCategory = await Category.findOne({ name: category });
            if (!existingCategory) return res.status(400).json(new ApiResponse(400, "Category does not exist"));
            blog.category = existingCategory._id;
        }
        if (assets) {
            // Delete previous assets from cloudinary
            blog.assets.map(async (asset) => {
                const public_id = asset.split("/").pop().split(".")[0];
                await deleteAssetsFromCloudinary(public_id);
            });
            // Upload new assets to cloudinary
            const cloudinaryUploads = [];
            for (const asset of assets) {
                const result = await uploadAssetsOnCloudinary(asset);
                cloudinaryUploads.push(result.secure_url);
            }
            blog.assets = cloudinaryUploads;
        }
        if (tags) {
            // convert tags to array
            const existingTags = await Tag.find({ name: { $in: tags } });
            if (!existingTags) return res.status(400).json(new ApiResponse(400, "Some tags do not exist"));
            const tagIds = existingTags.map(tag => tag._id);
            blog.tags = []; // clear the tags array
            tagIds.map(async (tag) => {
                blog.tags.push(tag);
            });

        }
        await blog.save();
        res.status(200).json(new ApiResponse(200, "Blog updated", blog));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Blog ID is required"));
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json(new ApiResponse(404, "Blog not found"));

        // Delete all assets of the blog
        blog.assets.map(async (asset) => {
            const public_id = asset.split("/").pop().split(".")[0];
            await deleteAssetsFromCloudinary(public_id)
        });

        // Delete all comments of the blog
        blog.comments.map(async (comment) => {
            await Comment.findByIdAndDelete(comment);
        }
        );
        await blog.deleteOne();
        res.status(200).json(new ApiResponse(200, "Blog deleted"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

export { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
