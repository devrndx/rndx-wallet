import { put, call } from "redux-saga/effects";
import {
  internalServerError,
  modalError,
} from "../../../containers/errors/statusCodeMessage";

import i18n from "../../../utils/i18n";
import { getAuthToken, getUserSeedWords } from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import TransactionService from "../../../services/transactionService";

const coinService = new CoinService();
const transactionService = new TransactionService();

export function* getWalletSendModalFee(action) {
  try {
    let token = yield call(getAuthToken);

    let response = yield call(coinService.getFee, action.fromAddress, token);

    if (response) {
      yield put({
        type: "GET_WALLET_MODAL_SEND_FEE",
        fee: response,
      });

      return;
    }
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());
  }
}
export function* getWalletTransferAvailable(action) {
  try {
    let token = yield call(getAuthToken);

    let response = yield call(
      coinService.getAvailableAmount,
      action.fromAddress,
      token
    );

    if (response) {
      yield put({
        type: "GET_WALLET_TRANSFER_TOKEN_AVAILALBE",
        amount: response,
      });

      return;
    }
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());
  }
}
export function* getWalletCoinHistory(action) {
  try {
    let token = yield call(getAuthToken);
    let response = yield call(
      coinService.getCoinHistory,
      action.coin,
      action.address,
      token
    );

    if (!response.error) {
      yield put({
        type: "SET_WALLET_HISTORY",
        history: response,
      });

      yield put({
        type: "SET_WALLET_HISTORY_LOADING",
      });

      return;
    }

    yield put({
      type: "SET_WALLET_HISTORY_LOADING",
      state: true,
    });

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());
  }
}

export function* getCoinFee(action) {
  try {
    let response = yield call(coinService.getFee, action.coinType);
    yield put({
      type: "GET_COIN_FEE",
      fee: response,
    });
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());
  }
}

export function* setWalletTransaction(action) {
  try {
    let token = yield call(getAuthToken);

    let response = yield call(
      transactionService.transaction,
      action.transaction,
      token
    );

    if (response) {
      if (response.data.status == "NotEnabled" || response.data.status == "failed") {
        yield put({
          type: "SET_WALLET_MODAL_STEP",
          step: 2,
        });
        return;
      }

      yield put({
        type: "SET_WALLET_MODAL_STEP",
        step: 1,
      });

      yield put({
        type: "SET_WALLET_TRANSACTION",
        response: response,
      });

      return;
    }

    yield put({
      type: "SET_WALLET_MODAL_STEP",
      step: 2,
    });

    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());

    return;
  } catch (error) {
    yield put({
      type: "CHANGE_WALLET_ERROR_STATE",
      state: true,
    });
    yield put(internalServerError());
  }
}
