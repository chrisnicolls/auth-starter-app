module.exports = {
  method: "GET",
  path: "/api/users/{userId}",
  config: {
    handler: function(request, reply) {
      let userId = request.params.userId;

      this.models.User
        .get(userId)
        .then(result => reply(result))
        .catch(err => reply(err));
    }
  }
};
