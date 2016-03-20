import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

export interface ControlState {
  clientCount:number,
  delay:number
}

@Injectable()
export class Remote {

  private controlSocket:SocketIOClient.Socket;

  chimes() {
    const socket = io.connect('http://localhost:8081/chimes');
    return Observable.create((observer) => {
      socket.on('chime', (note) => observer.next(note));
      return () => socket.close();
    });
  }

  controlEvents():Observable<ControlState> {
    return Observable.create((observer) => {
      this.getControlSocket().on('state', (state) => observer.next(state));
    });
  }

  adjustRate(delta:number) {
    this.getControlSocket().emit('adjustRate', delta);
  }

  resetRate(delta:number) {
    this.getControlSocket().emit('resetRate');
  }

  private getControlSocket() {
    if (!this.controlSocket) {
      this.controlSocket = io.connect('http://localhost:8081/ctrl');
    }
    return this.controlSocket;
  }


}
