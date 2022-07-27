export const TESTNET = false;
export const BASE_URL = TESTNET ?
    "https://app.dev.rndx-wallet.io" :
    "https://app.rndx-wallet.io";

export const TETHER_URL = "https://api.omniwallet.org";
export const HEADER_RESPONSE = "Authorization";

export const HEADER_REQUEST = {
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
    }
};

export const HEADER_REQUEST_FORM = {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*"
    }
};

export const API_HEADER = {
    headers: {
        key: ""
    }
};

export const blockexplorer = {
    RNDX: TESTNET ?
        "https://baobab.scope.klaytn.com/tx/" : "https://scope.klaytn.com/tx/",
};