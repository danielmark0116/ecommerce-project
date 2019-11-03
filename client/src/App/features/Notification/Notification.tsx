import React, { Component, RefObject } from 'react';
import ee from 'event-emitter';

import {
  toggleNotification,
  popNotification
} from '../../animations/notification';

import style from '../../styles/main.module.scss';

const emitter = ee();

export const notify = (msg: string, time: number) => {
  emitter.emit('show', msg);
  emitter.emit('close', time);
};

interface IState {
  notRef: RefObject<HTMLDivElement>;
  msg: string;
  timer: any;
  isActive: Boolean;
}

export default class Notification extends Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      notRef: React.createRef<HTMLDivElement>(),
      msg: '',
      timer: null,
      isActive: false
    };

    emitter.on('show', (msg: string) => {
      const { isActive } = this.state;

      this.updateNotificationMsg(msg);

      clearTimeout(this.state.timer);

      if (isActive) {
        popNotification(this.state.notRef.current);
      } else {
        toggleNotification(this.state.notRef.current, true, () => null);
      }

      this.setState({
        isActive: true
      });
    });

    emitter.on('close', (time: any) => {
      this.setState({
        timer: setTimeout(() => {
          toggleNotification(this.state.notRef.current, false, () =>
            this.updateNotificationMsg('')
          );

          this.setState({
            isActive: false
          });
        }, time)
      });
    });

    emitter.on('closeBtn', () => {
      toggleNotification(this.state.notRef.current, false, () => null);
      clearTimeout(this.state.timer);

      this.setState({
        isActive: false
      });
    });
  }

  updateNotificationMsg = (msg: string) => {
    this.setState({
      msg
    });
  };

  render() {
    const { msg, notRef } = this.state;

    return (
      <div
        ref={notRef}
        onClick={() => {
          notify('message', 5000);
        }}
        className={style.notification_container}
      >
        <button
          onClick={e => {
            e.stopPropagation();
            emitter.emit('closeBtn');
          }}
        >
          close
        </button>
        {msg}
      </div>
    );
  }
}
