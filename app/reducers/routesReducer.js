import { ActionConst } from 'react-native-router-flux';
import {closeEvent} from '../actions/event';

const initialState = {
  scene: {},
};

export const routesReducer = (state = initialState, action) => {
  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene,
      };

    // ...other actions
    default:
      return state;
  }
}
