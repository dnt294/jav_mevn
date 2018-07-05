var _ = require('lodash');

export function popAlert(context, error) {
  debugger;
  if (!!error.response) {
    _.each(Object.values(error.response.data), (item) => {
      context._vm.$notify({
        group: 'notification',
        title: 'Error',
        text: item.message,
        duration: 5000,
        type: 'error',
      });
    });
  } else {
    context._vm.$notify({
        group: 'notification',
        title: 'Error',
        text: error.message,
        duration: 5000,
        type: 'error',
      });
  }
}
