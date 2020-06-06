import express, {IRouter} from 'express';
import DeviceRepository from '../devices/device-repository';

export default class ApiRouter {
  private router: IRouter
  
  constructor() {
    this.router = express.Router();
    this.router.get('/devices', async (req, res) => {
      res.json(DeviceRepository.defaultInstance.Devices);
    })
    this.router.get('/test', (req, res) => {
      res.write('Hello from router!')
      res.end();
    })
  }

  public get Router(): IRouter {
    return this.router;
  }
}