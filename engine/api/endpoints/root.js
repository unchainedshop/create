import { WebApp } from 'meteor/webapp';
import { embedControlpanelInMeteorWebApp } from '@unchainedshop/controlpanel';

export default async (options) => {
  embedControlpanelInMeteorWebApp(WebApp, options);
};
