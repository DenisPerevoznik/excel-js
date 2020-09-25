import {defaultStyles, defaultTitle} from '@/constans';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  lastOpenedDate: new Date().toJSON(),
};

const normalize = state => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: '',
  };
};

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}
