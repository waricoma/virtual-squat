// import L from "../../common/logger";
import { LineModel } from '../models/line';
// import { InsertResult } from "typeorm";

export class LineService {
  private lineModel: LineModel;

  constructor(lineModel: LineModel) {
    this.lineModel = lineModel;
  }
}
