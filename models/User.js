var keystone = require('keystone'),
  Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  company: { type: String, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Site Administrator', index: true },
  isApproved: { type: Boolean, label: 'Approve User', index: true },
  accessLevel: { type: Types.Select, options: [
    { value: '0', label: "No Access" },
    { value: '1', label: "Streaming" },
    { value: '2', label: "Download" }
  ] }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
