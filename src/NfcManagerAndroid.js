'use strict';
import {Platform} from 'react-native';
import {
  NativeNfcManager,
  NfcManagerEmitter,
  callNative,
} from './NativeNfcManager';
import {NfcEvents, NfcManagerBase} from './NfcManager';

const NfcAdapter = {
  FLAG_READER_NFC_A: 0x1,
  FLAG_READER_NFC_B: 0x2,
  FLAG_READER_NFC_F: 0x4,
  FLAG_READER_NFC_V: 0x8,
  FLAG_READER_NFC_BARCODE: 0x10,
  FLAG_READER_SKIP_NDEF_CHECK: 0x80,
  FLAG_READER_NO_PLATFORM_SOUNDS: 0x100,
};

class NfcManagerAndroid extends NfcManagerBase {
  constructor() {
    super();
    this.cleanUpTagRegistration = false;
  }

  requestTechnology = async (tech, options = {}) => {
    try {
      if (typeof tech === 'string') {
        tech = [tech];
      }

      const sessionAvailable = await this._hasTagEventRegistrationAndroid();

      // make sure we do register for tag event
      if (!sessionAvailable) {
        await this.registerTagEvent(options);
        this.cleanUpTagRegistration = true;
      }

      return callNative('requestTechnology', [tech]);
    } catch (ex) {
      throw ex;
    }
  };

  cancelTechnologyRequest = async () => {
    await callNative('cancelTechnologyRequest');

    if (!this.cleanUpTagRegistration) {
      await this.unregisterTagEvent();
      this.cleanUpTagRegistration = false;
    }
  };

  // -------------------------------------
  // public only for Android
  // -------------------------------------
  isEnabled = () => callNative('isEnabled');

  goToNfcSetting = () => callNative('goToNfcSetting');

  getLaunchTagEvent = () => callNative('getLaunchTagEvent');

  setNdefPushMessage = (bytes) => callNative('setNdefPushMessage', [bytes]);

  // -------------------------------------
  // (android) NfcTech.Ndef API
  // -------------------------------------
  getCachedNdefMessageAndroid = () => callNative('getCachedNdefMessage');

  makeReadOnlyAndroid = () => callNative('makeReadOnly');

  // -------------------------------------
  // (android) tNfcTech.MifareClassic API
  // -------------------------------------
  mifareClassicAuthenticateA = (sector, key) => {
    if (!key || !Array.isArray(key) || key.length !== 6) {
      return Promise.reject('key should be an Array[6] of integers (0 - 255)');
    }

    return callNative('mifareClassicAuthenticateA', [sector, key]);
  };

  mifareClassicAuthenticateB = (sector, key) => {
    if (!key || !Array.isArray(key) || key.length !== 6) {
      return Promise.reject('key should be an Array[6] of integers (0 - 255)');
    }

    return callNative('mifareClassicAuthenticateB', [sector, key]);
  };

  mifareClassicGetBlockCountInSector = (sector) =>
    callNative('mifareClassicGetBlockCountInSector', [sector]);

  mifareClassicGetSectorCount = () => callNative('mifareClassicGetSectorCount');

  mifareClassicSectorToBlock = (sector) =>
    callNative('mifareClassicSectorToBlock', [sector]);

  mifareClassicReadBlock = (block) =>
    callNative('mifareClassicReadBlock', [block]);

  mifareClassicReadSector = (sector) =>
    callNative('mifareClassicReadSector', [sector]);

  mifareClassicWriteBlock = (block, data) => {
    if (
      !data ||
      !Array.isArray(data) ||
      data.length !== this.MIFARE_BLOCK_SIZE
    ) {
      return Promise.reject(
        `data should be a non-empty Array[${this.MIFARE_BLOCK_SIZE}] of integers (0 - 255)`,
      );
    }

    return callNative('mifareClassicWriteBlock', [block, data]);
  };

  // -------------------------------------
  // (android) NfcTech.MifareUltralight API
  // -------------------------------------
  mifareUltralightReadPages = (pageOffset) =>
    callNative('mifareUltralightReadPages', [pageOffset]);

  mifareUltralightWritePage = (pageOffset, data) => {
    if (
      !data ||
      !Array.isArray(data) ||
      data.length !== this.MIFARE_ULTRALIGHT_PAGE_SIZE
    ) {
      return Promise.reject(
        `data should be a non-empty Array[${this.MIFARE_ULTRALIGHT_PAGE_SIZE}] of integers (0 - 255)`,
      );
    }

    return callNative('mifareUltralightWritePage', [pageOffset, data]);
  };

  // -------------------------------------
  // (android) setTimeout works for NfcA, NfcF, IsoDep, MifareClassic, MifareUltralight
  // -------------------------------------
  setTimeout = (timeout) => callNative('setTimeout', [timeout]);

  connect = (techs) => callNative('connect', [techs]);

  close = () => callNative('close');

  // -------------------------------------
  // (android) transceive works for NfcA, NfcB, NfcF, NfcV, IsoDep and MifareUltralight
  // -------------------------------------
  transceive = (bytes) => callNative('transceive', [bytes]);

  getMaxTransceiveLength = () => callNative('getMaxTransceiveLength');

  // -------------------------------------
  // Android private
  // -------------------------------------
  _hasTagEventRegistrationAndroid = () => callNative('hasTagEventRegistration');
}

export {NfcAdapter, NfcManagerAndroid};
