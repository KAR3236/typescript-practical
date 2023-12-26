import express, { Application } from "express";
const blogRouter: Application = express();
import { validator } from "../../helper/validator";
import { idValidation } from "../../validation/idValidation";
import {
  addBlog,
  editBlog,
  deleteBlog,
  viewBlog,
  listOfBlog,
} from "../../controller/blogController";
import {
  addBlogValidation,
  editBlogValidation,
  idBlogValidation,
} from "../../validation/blogValidation";
import { authorization } from "../../helper/auth";

export default (): any => {
  blogRouter.post(
    "/api/blog/addBlog",
    authorization(["Admin", "User"]),
    validator.body(addBlogValidation),
    addBlog
  );
  blogRouter.put(
    "/api/blog/editBlog/:id",
    authorization(["Admin", "User"]),
    validator.params(idValidation),
    validator.body(editBlogValidation),
    editBlog
  );
  blogRouter.get(
    "/api/blog/viewBlog/:id",
    authorization(["Admin", "User"]),
    validator.params(idValidation),
    viewBlog
  );
  blogRouter.get(
    "/api/blog/listOfBlog",
    authorization(["Admin", "User"]),
    listOfBlog
  );
  blogRouter.delete(
    "/api/blog/deleteBlog/:id",
    authorization(["Admin", "User"]),
    validator.params(idValidation),
    deleteBlog
  );

  return blogRouter;
};
