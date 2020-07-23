import L from '../../common/logger';
import * as line from '@line/bot-sdk';

export class LineModel {
  private client: line.Client;

  constructor(client: line.Client) {
    this.client = client;
  }

  public async getProfile(userId: string): Promise<line.Profile> {
    L.info('Get line profile.');
    return this.client.getProfile(userId);
  }
}
