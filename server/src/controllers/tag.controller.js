import asyncHandler from "../utils/asyncHandler.js";
import { Tag } from "../models/tag.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createTag = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json(new ApiResponse(400, "Tag name is required"));
        const tag = await Tag.create({ name });
        res.status(201).json(new ApiResponse(201, "Tag created", tag));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getTags = asyncHandler(async (_, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(new ApiResponse(200, "Tags retrieved", tags));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getTagById = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Tag id is required"));
        const tag = await Tag.findById(id);
        if (!tag) return res.status(404).json(new ApiResponse(404, "Tag not found"));
        res.status(200).json(new ApiResponse(200, "Tag retrieved", tag));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const updateTag = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Tag id is required"));
        const { name } = req.body;
        if (!name) return res.status(400).json(new ApiResponse(400, "Tag name is required"));
        const tag = await Tag.findByIdAndUpdate(id, name, { new: true });
        if (!tag) return res.status(404).json(new ApiResponse(404, "Tag not found"));
        res.status(200).json(new ApiResponse(200, "Tag updated", tag));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const deleteTag = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Tag id is required"));
        const tag = await Tag.findByIdAndDelete(id);
        if (!tag) return res.status(404).json(new ApiResponse(404, "Tag not found"));
        res.status(200).json(new ApiResponse(200, "Tag deleted", tag));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

export { createTag, getTags, getTagById, deleteTag, updateTag };