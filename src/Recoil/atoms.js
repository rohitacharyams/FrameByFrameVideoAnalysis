import { atom } from 'recoil';

const isLoggedInAtom = atom({
  key: 'isLoggedIn',
  default: false,
});

export { isLoggedInAtom };