import { NameService } from './world';
import { World } from 'cucumber';

export interface CustomWorld extends World {
  nameService: NameService;
  attach: Function;
  parameters: Object;
}
