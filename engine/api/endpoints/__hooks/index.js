import { WebApp } from 'meteor/webapp';

const health = () => {
  // eslint-disable-next-line
  console.log('OK');
};

class PromiseRunner {
  pending;

  constructor(promise, ...rest) {
    this.pending = true;
    this.promise = promise;
    this.run(...rest);
  }

  async run(...rest) {
    try {
      await this.promise(...rest);
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
    this.pending = false;
  }
}

const endResponseAfterAwait = (promise, options = {}) => {
  let runner;
  return async (req, res) => {
    if (runner && runner.pending && !options.allowRace) {
      res.writeHead(405);
      res.end('Promise already running');
      return;
    }
    try {
      runner = new PromiseRunner(promise, options, req.query);
      res.writeHead(200);
      res.end('Operation started');
    } catch (e) {
      res.writeHead(401);
      res.end(e.message);
    }
  };
};

export default async ({ sharedSecret, ...options }) => {
  const PATH = `/__hooks/${sharedSecret}`;
  WebApp.connectHandlers.use(
    `${PATH}/health`,
    endResponseAfterAwait(health, options),
  );
};
