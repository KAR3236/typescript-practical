import { Request, Response } from "express";
import { Blog, BlogModelInstance } from "../model/blog";

export const addBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const createBlogData: BlogModelInstance | null = await Blog.create(
      req.body
    );
    if (createBlogData) {
      return res.status(201).json({
        status: "success",
        code: 201,
        message: "Blog added successfully.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};

export const editBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const [updateBlogData]: number[] = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updateBlogData === 1) {
      return res.status(202).json({
        status: "success",
        code: 202,
        message: "Blog update successfully.",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Data not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};

export const viewBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const viewBlogData: BlogModelInstance | null = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (viewBlogData) {
      return res.status(202).json({
        status: "success",
        code: 200,
        message: "Get blog successfully.",
        data: viewBlogData,
      });
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Data not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};

export const listOfBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const listOfBlogData: BlogModelInstance[] | null = await Blog.findAll({
      order: [["id", "DESC"]],
    });
    if (listOfBlogData.length > 0) {
      return res.status(202).json({
        status: "success",
        code: 200,
        message: "Get blog list successfully.",
        data: listOfBlogData,
      });
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Data not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updateBlogData: number = await Blog.destroy({
      where: {
        id,
      },
    });
    if (updateBlogData) {
      return res.status(200).json({
        status: "success",
        code: 200,
        message: "Blog deleted successfully.",
      });
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Data not found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Please try again.",
    });
  }
};
