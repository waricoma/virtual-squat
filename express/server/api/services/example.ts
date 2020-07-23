import L from '../../common/logger';
// import axios from 'axios';
import moment from 'moment';

export const exampleFun = (): number => {
  L.info('called: exampleFun');
  return moment().unix();
};
