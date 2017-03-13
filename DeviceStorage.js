import {AsyncStorage} from 'react-native';
import TokenStorage from 'baqend/lib/util/TokenStorage';

export class DeviceStorage extends TokenStorage {

  static create(origin) {
    return AsyncStorage.getItem(origin).then(token => {
      return new DeviceStorage(origin, token);
    });
  }

  constructor(origin, token) {
    super(origin, token);
  }

  _saveToken(origin, token, temporary) {
    if (token) {
      AsyncStorage.setItem(origin, token);
    } else {
      AsyncStorage.removeItem(origin);
    }
  }
}