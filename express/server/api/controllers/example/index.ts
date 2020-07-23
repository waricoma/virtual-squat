import { Controller, Get, Route } from 'tsoa';
import * as exampleService from '../../services/example';

@Route('example')
export class DevController extends Controller {
  @Get('/create')
  public create(): number {
    return exampleService.exampleFun();
  }
}
