import { Meteor } from 'meteor/meteor';
import './lib/plugins';
import setupDatabase from './lib/seed/setup';
import setupAPI from './api';
import setupAuth from './lib/auth';

Meteor.startup(() => {
  process.title = 'unchained-engine';
  const { MAIL_URL, TRACING, ADMIN_ACCESS_SECRET } = process.env;

  setupAuth({ adminAccessKey: ADMIN_ACCESS_SECRET || 'secret' });
  setupAPI({
    introspection: true,
    disableEmailInterception: !!MAIL_URL,
    tracing: !!TRACING,
  });
  setupDatabase();
});
