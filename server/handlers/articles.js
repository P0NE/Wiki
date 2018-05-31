const articles = require("../services/articles");
const mongoose = require("mongoose");
const Articles = mongoose.model("Articles");

const postArticles = async (req, res) => {
  const body = req.payload;
  console.log(body);
  if (!body.title) {
    return res.status(422).json({
      errors: {
        title: "is required"
      }
    });
  }

  if (!body.author) {
    return res.status(422).json({
      errors: {
        author: "is required"
      }
    });
  }

  return articles.postArticles(body);
};

const getArticles = async () => {
  return articles.getArticles();
};

const getArticlesById = async req => {
  return articles.getArticlesById(req.params.id);
};

const patchArticles = async req => {
  const body = req.payload;
  return articles.patchArticles(body, req.params.id);
};

const deleteArticles = async req => {
  return articles.deleteArticles(req.params.id);
};

module.exports = {
  postArticles,
  getArticles,
  getArticlesById,
  patchArticles,
  deleteArticles
};
