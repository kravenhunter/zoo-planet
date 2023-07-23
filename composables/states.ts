// Глобальные переменные состояние

export const useCounter = () => useState<number>('counter', () => 0);

export const useColor = () => useState<string>('color', () => 'pink');

// eslint-disable-next-line antfu/top-level-function
export const usefirebaseUser = () =>
  useState('firebaseUser', () => {
    return {};
  });
