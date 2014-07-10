var keystone = require('keystone'),
  User = keystone.list('User');

exports = module.exports = function(req, res) {

  var view = new keystone.View(req, res),
    locals = res.locals;

  // Set locals
  locals.section = 'register';
  locals.accessLevel = User.fields.accessLevel.ops;
  locals.formData = req.body || {};
  locals.validationErrors = {};
  locals.userSubmitted = false;

  // On POST requests, add the Enquiry item to the database
  view.on('post', { action: 'register' }, function(next) {

    var newUser = new User.model(),
      updater = newUser.getUpdateHandler(req);

    updater.process(req.body, {
      flashErrors: true,
      fields: 'name, email, company, password, accessLevel',
      errorMessage: 'There was a problem submitting your enquiry:'
    }, function(err) {
      if (err) {
        locals.validationErrors = err.errors;
      } else {
        locals.userSubmitted = true;
      }
      next();
    });

  });

  view.render('register');

};
