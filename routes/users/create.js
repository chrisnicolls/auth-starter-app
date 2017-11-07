module.exports = {
  method: "POST",
  path: "/api/users",
  config: {
    handler: function(request, reply) {
      let user = new this.models.User(request.payload);

      user
        .save()
        .then(user => reply(user))
        .catch(err => reply(err));
    }
  }
};
