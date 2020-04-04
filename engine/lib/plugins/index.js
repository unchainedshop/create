import 'meteor/unchained:core-messaging/plugins/local-mail';
import 'meteor/unchained:core-payment/plugins/invoice';
import 'meteor/unchained:core-delivery/plugins/send-mail';
import 'meteor/unchained:core-pricing/plugins/order-items';
import 'meteor/unchained:core-pricing/plugins/order-discount';
import 'meteor/unchained:core-pricing/plugins/product-catalog-price';
import 'meteor/unchained:core-pricing/plugins/product-discount';
import 'meteor/unchained:core-filters/plugins/local-search';
import 'meteor/unchained:core-worker/plugins/external';
import 'meteor/unchained:core-worker/plugins/heartbeat';
import { WorkerDirector } from 'meteor/unchained:core-worker';
import EventListenerWorker from 'meteor/unchained:core-worker/workers/eventListener';
import FailedRescheduler from 'meteor/unchained:core-worker/schedulers/failedRescheduler';
import './author-filter';

export default () => {
  const { DISABLE_WORKER } = process.env;

  new FailedRescheduler({ WorkerDirector }).start();

  if (!DISABLE_WORKER) {
    new EventListenerWorker({
      WorkerDirector,
      workerId: 'EventWorker',
    }).start();
  }
};
