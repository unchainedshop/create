import getConfig from 'next/config';
import buildUnchainedSchema from './unchained';

const {
  publicRuntimeConfig: { NODE_ENV, SKIP_INVALID_REMOTES },
} = getConfig();

const unchainedSchema = buildUnchainedSchema();

export { unchainedSchema };
export default async () => {
  // eslint-disable-next-line no-undef
  const [unchained] = await Promise.all([buildUnchainedSchema()]);

  const throwInProduction =
    NODE_ENV === 'production' && !SKIP_INVALID_REMOTES
      ? (potentiallyNull) => {
          if (!potentiallyNull)
            throw new Error('All Backends have to run in production!');
          return true;
        }
      : Boolean;

  return [unchained].filter(throwInProduction);
};
