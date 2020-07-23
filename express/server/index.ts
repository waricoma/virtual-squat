import './common/env';
import { expressServer } from './common/server';
// import { createConnection } from 'typeorm';

const lineConfig = {
  channelAccessToken: process.env.LINE_CH_ACCESS_TOKEN.toString(),
  channelSecret: process.env.LINE_CH_SECRET.toString(),
};

const slackReceiverOpts = {
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: {
    commands: '/commands',
    events: '/events',
    interactive: '/interactive',
  },
};

const port = parseInt(process.env.PORT);

// createConnection().then(
(async (): Promise<void> => {
  await expressServer.setBodyParserOrLineSignatureParser(lineConfig);
  await expressServer.handleLineEv('/webhook/line/', lineConfig);
  await expressServer.setSlackBolt(
    '/webhook/slack/',
    process.env.SLACK_BOT_TOKEN,
    slackReceiverOpts
  );
  // await expressServer.setNotFoundPage();
  // await expressServer.setErrPage();
  await expressServer.listen(port);
})();
// );
