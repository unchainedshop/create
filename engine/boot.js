import { Meteor } from 'meteor/meteor';
import './lib/plugins';
import { WebApp } from 'meteor/webapp';
import { embedControlpanelInMeteorWebApp } from '@unchainedshop/controlpanel';
import setupAPI from './api';
import setupDatabase from './lib/seed/setup';

Meteor.startup(async () => {
  await setupAPI({
    introspection: true,
    playground: true,
  })
  setupDatabase();

  embedControlpanelInMeteorWebApp(WebApp);
});
