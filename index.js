'use strict';

module.exports = function(kbox) {

  // Npm mods
  var _ = require('lodash');

  // Pkg.json
  var pkgJson = require('./package.json');

  var backdropMatrix = {
    '1': {
      php: '5.3.29',
      drush: 'backdrush'
    }
  };

  // Declare our app to the world
  kbox.create.add('backdrop', {
    task: {
      name: 'Backdrop',
      module: 'kalabox-app-backdrop',
      description: 'Creates a backdrop app.'
    }
  });

  // Add an option
  kbox.create.add('backdrop', {
    option: {
      name: 'name',
      weight: -99,
      task: {
        kind: 'string',
        description: 'The name of your app.',
      },
      inquire: {
        type: 'input',
        message: 'What will this app be called',
        validate: function(value) {
          // @todo some actual validation here
          return true;
        },
        filter: function(value) {
          return _.kebabCase(value);
        },
        default: 'My Backdrop App'
      },
      conf: {
        type: 'global',
        key: 'appName'
      }
    }
  });

  // Load php things
  require(pkgJson.postInstallAssets['kalabox-plugin-php'].create)(
    kbox,
    _.merge(
      {},
      backdropMatrix,
      {
        '2': {php: '5.4.40'},
        '3': {php: '5.5.24'}
      }
    ),
    'backdrop'
  );

  // Load git things
  require(pkgJson.postInstallAssets['kalabox-plugin-git'].create)(
    kbox,
    'backdrop'
  );

  // Task to create kalabox apps
  kbox.tasks.add(function(task) {
    kbox.create.buildTask(task, 'backdrop');
  });

};
