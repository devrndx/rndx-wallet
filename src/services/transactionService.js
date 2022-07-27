import axios from "axios";

// ERROR
import {
    internalServerError
} from "../containers/errors/statusCodeMessage";

// COINS
import CoinService from "./coinService";

class TransactionService {
    async transaction(transaction, token) {
        try {
            let {
                fromAddress,
                toAddress,
                fee,
                amount,
            } = transaction;

            let coinService = new CoinService();
            let response = await coinService.createTransaction(
                fromAddress,
                toAddress,
                amount,
                fee,
                token
            );

            if (response === "error" || !response) {
                return;
            }

            return response;
        } catch (error) {
            internalServerError();
            return error;
        }
    }
}
export default TransactionService;