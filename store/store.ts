import { proxy, useSnapshot } from 'valtio';

const globalState = proxy({
  username: '',
  setUsername: (username: string) => {
    globalState.username = username;
  }
});

export default globalState;