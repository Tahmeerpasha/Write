import asyncHandler from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";
import { Blog } from "../models/blog.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createComment = asyncHandler(async (req, res) => {
    try {
        const { content } = req.body;
        const { postId } = req.params;
        const author = req.user._id;
        if (!content) return res.status(400).json(new ApiResponse(400, "Comment content is required"));
        if (!postId) return res.status(400).json(new ApiResponse(400, "Post id is required"));
        if (!author) return res.status(400).json(new ApiResponse(400, "Author is required"));
        const post = await Blog.findById(postId);
        if (!post) return res.status(404).json(new ApiResponse(404, "Post not found"));
        const comment = await Comment.create({ content, author, post: postId });
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json(new ApiResponse(201, "Comment added to post", post));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getCommentsByPostId = asyncHandler(async (req, res) => {
    try {
        const { postId } = req.params;
        if (!postId) return res.status(400).json(new ApiResponse(400, "Post id is required"));
        const post = await Blog.findById(postId).populate("comments");
        if (!post) return res.status(404).json(new ApiResponse(404, "Post not found"));
        res.status(200).json(new ApiResponse(200, "Comments found", post.comments));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getCommentById = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) return res.status(400).json(new ApiResponse(400, "Comment id is required"));
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json(new ApiResponse(404, "Comment not found"));
        res.status(200).json(new ApiResponse(200, "Comment found", comment));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const updateComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) return res.status(400).json(new ApiResponse(400, "Comment id is required"));
        const comment = await Comment.findByIdAndUpdate(commentId, req.body, { new: true });
        if (!comment) return res.status(404).json(new ApiResponse(404, "Comment not found"));
        res.status(200).json(new ApiResponse(200, "Comment updated", comment));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const deleteComment = asyncHandler(async (req, res) => {
    try {
        const { commentId } = req.params;
        if (!commentId) return res.status(400).json(new ApiResponse(400, "Comment id is required"));
        const comment = await Comment.findByIdAndDelete(commentId);
        const post = await Blog.findById(comment.post);
        post.comments = post.comments.filter(c => c.toString() !== commentId);
        await post.save();
        if (!comment) return res.status(404).json(new ApiResponse(404, "Comment not found"));
        res.status(200).json(new ApiResponse(200, "Comment deleted", comment));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

export { createComment, getCommentsByPostId, getCommentById, updateComment, deleteComment };