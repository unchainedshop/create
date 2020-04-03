import getConfig from 'next/config';
import buildUnchainedSchema from './unchained';
import buildGetCockpitSchema from './getcockpit';

const {
  publicRuntimeConfig: { NODE_ENV, SKIP_INVALID_REMOTES },
} = getConfig();

export default async () => {
  const [unchainedSchema, getCockpitSchema] = await Promise.all([
    buildUnchainedSchema(),
    buildGetCockpitSchema(),
  ]);

  const throwInProduction =
    NODE_ENV === 'production' && !SKIP_INVALID_REMOTES
      ? (potentiallyNull) => {
          if (!potentiallyNull)
            throw new Error('All Backends have to run in production!');
          return true;
        }
      : Boolean;

  return [unchainedSchema, getCockpitSchema].filter(throwInProduction);
};
