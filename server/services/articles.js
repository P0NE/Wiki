const mongoose = require("mongoose");
const Articles = mongoose.model("Articles");

async function getArticles() {
  return Articles.find()
    .sort({ createdAt: "descending" })
    .then(articles => ({
      articles: articles.map(article => article.toJSON())
    }));
}

async function getArticlesById(id) {
  return Articles.findById(id).then(article => ({
    article: article
  }));
}

async function postArticles(body) {
  const finalArticle = new Articles(body);
  const result = await finalArticle.save();
  return result;
}

async function patchArticles(body, id) {
  const updateArticle = new Articles(body);

  if (typeof body.title !== "undefined") {
    updateArticle.title = body.title;
  }

  if (typeof body.author !== "undefined") {
    updateArticle.author = body.author;
  }

  if (typeof body.body !== "undefined") {
    updateArticle.body = body.body;
  }

  updateArticle._id = id;

  return Articles.update({ _id: id }, updateArticle).then(article => ({
    article: updateArticle
  }));
}

async function deleteArticles(id) {
  return Articles.findByIdAndRemove(id).then(() => ({
    article: "article supprimé"
  }));
}

module.exports = {
  getArticles,
  getArticlesById,
  postArticles,
  patchArticles,
  deleteArticles
};
