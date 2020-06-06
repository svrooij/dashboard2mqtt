import http, { Server } from 'http';
import path from 'path';
import WebSocket from 'ws'
import express from 'express';
import ApiRouter from './web/api-router';

export default class DashboardServer {
  private server?: Server;
  private wsServer?: WebSocket.Server;
  constructor(private readonly port: number, private readonly startServer = true) {
    if(startServer) {
      this.start();
    }
  }

  public start() {
    // Setting up express like this, allows for adding the WebSocket server.
    const app = express();
    this.server = http.createServer(app);

    // Add Websocket support to same server (at /api/stream)
    this.wsServer = new WebSocket.Server({ server: this.server, path: '/api/stream' });
    this.wsServer.on('connection', (socket: WebSocket, req: http.IncomingMessage) => {
      console.log('New WS connection');
    })

    // Load ApiRouter and let it handle all the /api/v1 requests.
    const apiRouter = new ApiRouter();
    app.use('/api/v1', apiRouter.Router);

    // Add static hosting for the angular app (in './web/wwwroot').
    app.use(express.static(path.join(__dirname, 'web', 'wwwroot'), { index: 'index.html' }));
    
    // Start the server like you normally would.
    this.server.listen(this.port)
  }

  public broadcastMessage(topic: string, data: any): void {
    const msgObject = {
      topic: topic,
      data: data
    };
    const msg = JSON.stringify(msgObject);
    this.wsServer?.clients.forEach((socket) => {
      socket.send(msg);
    })
  }

  public async close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.server) {
        this.server.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      }
    })
  }
}