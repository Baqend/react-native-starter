import { AsyncStorage } from 'react-native'

import { applyMiddleware, combineReducers } from 'redux'

import { createStoreWithBaqend, baqendReducer } from 'redux-baqend'
import middlewares from '../middleware'
import reducers from '../reducers'

import { db, util } from 'baqend/lib/baqend'

export class DeviceStorage extends util.TokenStorage {

  constructor(origin, token) {
    super(origin, token);
  }

  _saveToken(origin, token, temporary) {
    if (token) {
      AsyncStorage.setItem('@Baqend:' + origin, token);
    } else {
      AsyncStorage.removeItem('@Baqend:' + origin);
    }
  };

}

db.configure({
  tokenStorageFactory: {
    create: origin => {
      return AsyncStorage.getItem('@Baqend:' + origin).then((token) => {
        return new DeviceStorage(origin, token);
      })
    }
  }
})

export default (initialState = {}) => {
  const reducer = combineReducers({
    baqend: baqendReducer,
    ...reducers
  })
  const middleware = applyMiddleware(
    ...middlewares
  )
  return createStoreWithBaqend(
    db.connect('app-starter', true),
    reducer,
    initialState,
    middleware
  )
}
