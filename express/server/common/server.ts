import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import L from './logger';
import { RegisterRoutes } from '../routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { redirectToHTTPS } from 'express-http-to-https';
import * as line from '@line/bot-sdk';
import { LineEvRouter } from '../line';
import * as slackBolt from '@slack/bolt';
class ExpressServer {
  private app = express();
  private lineSignatureMiddleware;

  constructor() {
    const root = path.normalize(__dirname + '/../..');
    this.app.set('appPath', `${root}client`);
    this.app.use(helmet());
    this.app.use(cookieParser(process.env.SESSION_SECRET || 'mySecret'));
    this.app.use(express.static(`${root}/../vue/dist`));

    // Define app's routing
    RegisterRoutes(this.app);

    // Set Swagger UI
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

  public async setBodyParserOrLineSignatureParser(
    config?: line.MiddlewareConfig
  ): Promise<void> {
    this.app.use(this.bodyParserOrLineSignatureParser(line.middleware(config)));
  }

  private bodyParserOrLineSignatureParser(
    lineSignatureMiddleware?
  ): (req, res, next) => void {
    return (req, res, next): void => {
      if (req.headers['x-line-signature']) {
        lineSignatureMiddleware(req, res, next);
        return;
      }

      this.bodyParserMiddleware(req, res, next);
      this.bodyParserUrlEncoded(req, res, next);
      this.bodyParserText(req, res, next);
    };
  }

  private bodyParserMiddleware = bodyParser.json({
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  private bodyParserUrlEncoded = bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  private bodyParserText = bodyParser.text({
    limit: process.env.REQUEST_LIMIT || '100kb',
  });

  public async handleLineEv(
    webHookPath: string,
    config: line.ClientConfig
  ): Promise<void> {
    this.app.post(webHookPath, (req, res) => {
      Promise.all(req.body.events.map(new LineEvRouter(config).hears))
        .then((result) => res.json(result))
        .catch((err) => {
          L.error(err);
          res.status(500).end();
        });
    });
  }

  public async setSlackBolt(
    webHookPath: string,
    botToken: string,
    receiverOpts: {
      signingSecret: string;
      endpoints: {
        commands: string;
        events: string;
        interactive: string;
      };
    }
  ): Promise<void> {
    const boltReceiver = new slackBolt.ExpressReceiver(receiverOpts);
    const boltApp = boltReceiver.app as express.Application;
    this.app.use(webHookPath, boltApp);

    const bolt = new slackBolt.App({
      receiver: boltReceiver,
      token: botToken,
    });

    bolt.event('app_home_opened', async ({ event, say }) => {
      await say(`Hey there <@${event.user}>!`);
    });
  }

  public async setNotFoundPage(): Promise<void> {
    // 404
    this.app.use((req, res) => {
      if (req.xhr) {
        res.status(404);

        return res.json({
          method: req.method,
          protocol: req.protocol,
          version: req.httpVersion,
          url: req.url,
        });
      }

      res.redirect(301, '/');
    });
  }

  public async setErrPage(): Promise<void> {
    // 500
    this.app.use((err, req, res, next) => {
      console.log(next);

      if (req.xhr) {
        res.status(500);

        res.json({
          method: req.method,
          protocol: req.protocol,
          version: req.httpVersion,
          url: req.url,
          name: err.name,
          message: err.message,
          stack: err.stack,
        });

        return;
      }

      res.redirect(301, '/');
    });
  }

  public async setRedirectToHTTPS(): Promise<void> {
    this.app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));
  }

  public async listen(port: number): Promise<void> {
    const welcome = (p: number) => (): void =>
      L.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(this.app).listen(port || 3000, welcome(port || 3000));
  }
}

export const expressServer = new ExpressServer();
