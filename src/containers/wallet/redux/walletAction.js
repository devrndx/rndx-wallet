export const setSelectedCoin = coin => ({
    type: "SET_SELECTED_COIN",
    coin
});

export const setUserConfigureOpen = () => ({
    type: "SET_USER_CONFIGURE_OPEN"
});

export const setWalletSendModalOpen = () => ({
    type: "SET_WALLET_MODAL_OPEN"
});

export const setWalletSendModalLoading = () => ({
    type: "SET_WALLET_MODAL_LOADING"
});

export const setWalletModalStep = step => ({
    type: "SET_WALLET_MODAL_STEP",
    step
});

export const setWalletSendModalAmount = amount => ({
    type: "SET_WALLET_MODAL_SEND_AMOUNT",
    amount
});

export const setWalletSendModalFinalAmount = amount => ({
    type: "SET_WALLET_MODAL_FINAL_AMOUNT",
    amount
});

export const getWalletSendModalFee = (
    fromAddress,
    token
) => ({
    type: "GET_WALLET_MODAL_SEND_FEE_API",
    fromAddress,
    token
});

export const getWalletTransferAvailable = (
    fromAddress,
    token
) => ({
    type: "GET_WALLET_TRANSFER_TOKEN_AVAILALBE_API",
    fromAddress,
    token
});

export const setWalletSendModalSelectedFee = fee => ({
    type: "SET_WALLET_MODAL_SEND_SELECTED_FEE",
    fee
});

export const setWalletSendModalSelectedFeeLunes = fee => ({
    type: "SET_WALLET_MODAL_SEND_SELECTED_FEELUNES",
    fee
});

export const setWalletSendModalSelectedFeePerByte = fee => ({
    type: "SET_WALLET_MODAL_SEND_SELECTED_FEEPERBYTE",
    fee
});

export const setWalletLoading = state => ({
    type: "SET_WALLET_LOADING",
    state
});

export const getWalletCoinHistory = (coin, address) => ({
    type: "GET_WALLET_COIN_HISTORY_API",
    coin,
    address
});

export const setWalletCoinHistoryLoading = state => ({
    type: "SET_WALLET_HISTORY_LOADING",
    state
});

export const setWalletTransaction = (transaction, password) => ({
    type: "SET_WALLET_TRANSACTION_API",
    transaction,
    password
});

export const clearWalletState = () => ({
    type: "CLEAR_WALLET_STATE"
});

export const getCoinFeeValue = coinType => ({
    type: "GET_COIN_FEE_API",
    coinType
});

export const resetModalSend = () => ({
    type: "SET_RESET_MODAL_SEND"
})
