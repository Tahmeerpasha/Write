import asyncHandler from "../utils/asyncHandler.js";
import { Category } from "../models/category.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json(new ApiResponse(400, "Category name is required"));
        const category = await Category.create({ name });
        res.status(201).json(new ApiResponse(201, "Category created", category));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getCategories = asyncHandler(async (_, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(new ApiResponse(200, "Categories retrieved Successfully", categories));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Category id is required"));
        const category = await Category.findById(id);
        if (!category) return res.status(404).json(new ApiResponse(404, "Category not found"));
        res.status(200).json(new ApiResponse(200, "Category retrieved", category));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Category id is required"));
        const { name } = req.body;
        if (!name) return res.status(400).json(new ApiResponse(400, "Category name is required"));
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) return res.status(404).json(new ApiResponse(404, "Category not found"));
        res.status(200).json(new ApiResponse(200, "Category updated Successfully", category));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const id = req.params?.id;
        if (!id) return res.status(400).json(new ApiResponse(400, "Category id is required"));
        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json(new ApiResponse(404, "Category not found"));
        res.status(200).json(new ApiResponse(200, "Category deleted", category));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, error.message));
    }
});

export { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };