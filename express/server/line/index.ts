import * as line from '@line/bot-sdk';
// import { MsgTypeText } from './interface';
import { LineEvRouteingHelper } from './helper';
// import { LineModel } from '../api/models/line';
// import { LineService } from '../api/services/line';

const lineEvRouteingHelper = new LineEvRouteingHelper();

export class LineEvRouter {
  constructor(config: line.ClientConfig) {
    const lineClient: line.Client = new line.Client(config);
    console.log(lineClient);
  }

  public async hears(event: line.WebhookEvent): Promise<void> {
    return lineEvRouteingHelper.hears(event);
  }
}
