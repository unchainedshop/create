import { Meteor } from 'meteor/meteor';
import './lib/plugins';
import setupDatabase from './lib/seed/setup';
import setupAPI from './api';

Meteor.startup(() => {
  process.title = 'unchained-engine';
  const { MAIL_URL, TRACING, ADMIN_ACCESS_SECRET } = process.env;

  setupAPI({
    introspection: true,
    disableEmailInterception: !!MAIL_URL,
    tracing: !!TRACING,
  });
  setupDatabase();
});
