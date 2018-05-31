const Joi = require("joi");
const articlesHandler = require("../handlers/articles");

const articlesPlugin = {
  name: "articlesPlugin",
  async register(server) {
    server.route({
      method: "GET",
      path: "/articles",
      config: {
        cors: true,
        handler: articlesHandler.getArticles,
        description: "find all articles",
        notes: "return all the articles",
        tags: ["api"]
      }
    });

    server.route({
      method: "POST",
      path: "/articles",
      config: {
        cors: true,
        handler: articlesHandler.postArticles,
        description: "post an article",
        notes: "add an article to the database",
        tags: ["api"]
      }
    });

    server.route({
      method: "GET",
      path: "/article/{id}",
      config: {
        cors: true,
        handler: articlesHandler.getArticlesById,
        description: "find article by id",
        notes: "Returns an article by his id",
        tags: ["api"]
      }
    });

    server.route({
      method: "PATCH",
      path: "/article/{id}",
      config: {
        cors: true,
        handler: articlesHandler.patchArticles,
        description: "patch article by id",
        notes: "Modify an article by his id",
        tags: ["api"]
      }
    });

    server.route({
      method: "DELETE",
      path: "/article/{id}",
      config: {
        cors: {
          origin: ["*"],
          headers: [
            "Access-Control-Allow-Origin",
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type",
            "CORELATION_ID"
          ],
          credentials: true
        },
        handler: articlesHandler.deleteArticles,
        description: "delete article by id",
        notes: "Delete an article by his id",
        tags: ["api"]
      }
    });
  }
};

module.exports = articlesPlugin;
