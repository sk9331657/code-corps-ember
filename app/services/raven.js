import RavenLogger from 'ember-cli-sentry/services/raven';

export default RavenLogger.extend({

  unhandledPromiseErrorMessage: '',

  captureException(/* error */) {
    this._super(...arguments);
  },

  captureMessage(/* message */) {
    return this._super(...arguments);
  },

  enableGlobalErrorCatching() {
    return this._super(...arguments);
  },

  callRaven(/* methodName, ...optional */) {
    return this._super(...arguments);
  }
});
