'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/metaracer-dev'
  },
  stripe: {
    secretKey: 'sk_test_c0LXaz9RIEiphwhiTydypxZu',
    publishableKey: 'pk_test_0WyXYNue5FUBgEozl5iB3tj8'
  }
};
