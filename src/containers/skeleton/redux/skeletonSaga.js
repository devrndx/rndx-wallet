import { put, call } from "redux-saga/effects";
import { internalServerError } from "../../../containers/errors/statusCodeMessage";
import {
    setAuthToken,
    getAuthToken,
    getUserSeedWords,
    getDefaultCrypto
} from "../../../utils/localStorage";
import { decryptAes } from "../../../utils/cryptography";
import CoinService from "../../../services/coinService";
import UserService from "../../../services/userService";
import TransactionService from "../../../services/transactionService";

const coinService = new CoinService();
const userService = new UserService();

export function* loadGeneralInfo(action) {
    try {
        let token = yield call(getAuthToken);
        let seed = yield call(getUserSeedWords);

        let pwd = action.password;
        if (!pwd) {
            pwd = getUserPassword()
        }

        let responseCoins = yield call(
            coinService.getGeneralInfo,
            token,
            decryptAes(seed, pwd)
        );

        let responseUser = yield call(userService.getUser, token);

        setAuthToken(responseCoins.token);
        delete responseCoins.token;

        yield put({
            type: "SET_USER_INFO",
            user: {
                birthday: undefined,
                city: undefined,
                country: undefined,
                terms: undefined,
                phone: undefined,
                state: undefined,
                street: undefined,
                profilePicture: undefined,
                name: responseUser.data.name,
                phonenum: responseUser.data.phonenumber,
                username: undefined,
                zipcode: undefined,
                email: responseUser.data.email,
                d_day: responseUser.data.destDateTime,
                ratio : responseUser.data.ratio
            }
        });

        yield put({
            type: "GET_GENERAL_INFO",
            coins: responseCoins
        });

        yield put({
            type: "CHANGE_LOADING_GENERAL_STATE"
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* loadWalletInfo(action) {
    try {
        const token = yield call(getAuthToken);
        const seed = yield call(getUserSeedWords);
        const defaultCrypto = yield call(getDefaultCrypto);

        let pwd = action.password;
        if (!pwd) {
            let token = yield call(getAuthToken);
            let responseUser = yield call(userService.getUser, token);

            yield put({
                type: "SET_USER_INFO",
                user: {
                    birthday: undefined,
                    city: undefined,
                    country: undefined,
                    terms: undefined,
                    phone: undefined,
                    state: undefined,
                    street: undefined,
                    profilePicture: undefined,
                    name: responseUser.data.name,
                    phonenum: responseUser.data.phonenumber,
                    username: undefined,
                    zipcode: undefined,
                    email: responseUser.data.email,
                    d_day: responseUser.data.destDateTime,
                    ratio : responseUser.data.ratio
                }
            });

            pwd = getUserPassword()
        }

        let responseCoins = yield call(
            coinService.getGeneralInfo,
            token,
            decryptAes(seed, pwd)
        );

        setAuthToken(responseCoins.token);
        delete responseCoins.token;

        let responseCoinHistory = yield call(
            coinService.getCoinHistory,
            defaultCrypto,
            responseCoins[defaultCrypto].address,
            token
        );

        yield put({
            type: "GET_GENERAL_INFO",
            coins: responseCoins
        });

        yield put({
            type: "SET_WALLET_HISTORY",
            history: responseCoinHistory
        });

        yield put({
            type: "CHANGE_LOADING_GENERAL_STATE"
        });

        yield put({
            type: "SET_WALLET_LOADING"
        });
        yield put({
            type: "SET_ASSET_LOADING"
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* balanceCoins() {
    try {
        let response = yield call();
        yield put({
            type: "GET_BALANCE_COINS",
            coins: response
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}

export function* createCoinsAddress() {
    try {
        let response = yield call();
        yield put({
            type: "POST_CREATE_COINS_ADDRESS",
            coins: response.data.data.coins
        });

        return;
    } catch (error) {
        yield put({
            type: "CHANGE_SKELETON_ERROR_STATE",
            state: true
        });
        yield put(internalServerError());
    }
}