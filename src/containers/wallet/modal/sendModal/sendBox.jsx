import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  setWalletSendModalLoading,
  setWalletTransaction,
  getWalletSendModalFee,
  getWalletTransferAvailable,

} from "../../redux/walletAction";

// MATERIAL UI
import Hidden from "@material-ui/core/Hidden";

// COMPONENTS
import ButtonSend from "./buttonSend.jsx";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

class SendBox extends React.Component {
  constructor() {
    super();
    this.state = { address: "", isVisible: false, amountVal: 0, isSent: false };
  }

  componentDidMount() {
    let { coin, getWalletSendModalFee, getWalletTransferAvailable, user,coins } = this.props;

    // getWalletSendModalFee(coins[coin].address);
    // getWalletTransferAvailable(coins[coin].address);
    }

  changeAddress = (address) => this.setState({ address });

  changeAmount = (amountVal) => {
    amountVal = amountVal.replace(/[^0-9]/g, '')
    this.setState({ amountVal });
  }

  sendToken = () => {
    let { close, coin, user, modal, coins, setWalletTransaction, setWalletSendModalLoading } = this.props;
    let { address, amountVal, isSent} = this.state;
    if (modal.loading) {
      return;
    }

    if (!isSent) {
      this.setState({isSent: true})
      if (modal.amount < parseFloat(amountVal) || parseFloat(amountVal) <= 0) {
        alert(i18n.t("MESSAGE_INVALID_AMOUNT"));
      }
      else if (coins[coin].address == address || address == "") {
        alert(i18n.t("MESSAGE_INVALID_ADDRESS"));      
      }
      else {
        setWalletSendModalLoading();

        const modAmount = Math.floor(parseFloat(amountVal));
        setWalletTransaction(
          {
            fromAddress: coins[coin].address,
            toAddress: address,
            amount: modAmount,
            fee: 400,
          },
        );
      }  
    }
  };

  validateAddress = () => {
    setWalletSendModalLoading();
    return;
  };

  validateSms = () => {
    setWalletSendModalLoading();
    return;
  };

  handleQrCodeReader = () => {
    let { address, amountVal, isSent } = this.state;
    let { coin, modal, user, coins } = this.props;
    let coinAmt = coins[coin];
    let availBalance = modal.amount;
    const fee = 0;

    return (
      <div>
        <div className={style.modalBoxSubContainer}>
          <div>
            <h4>{i18n.t("MODAL_SEND_ADDRESS")}</h4>
          </div>
          <input
            type="text"
            name="txtaddress"
            value={address}
            onChange={(event) => this.changeAddress(event.target.value)}
            className={style.inputClear}
          />
          <hr />
        </div>

        <div className={style.modalBoxSubContainer}>
          <div>
            <h4>{i18n.t("TRANSFER_AMOUNT")}</h4>
          </div>
          <input
            type="text"
            name="txtamount"
            value={amountVal}
            onChange={(event) => this.changeAmount(event.target.value)}
            className={style.inputClearAmount}
          />
          <p>{i18n.t("TRANSFER_AVAILABLE_AMOUNT")}: {availBalance} RNDX</p>
          <hr />
        </div>

        <div className={style.modalBoxSubContainer}>
          <div>
            <h4>{i18n.t("TRANSFER_FEE")}</h4>
          </div>
          <h4> {fee} RNDX</h4>
          <hr />
        </div>
        <div className={style.modalBoxSubContainer}>
          <ButtonSend
            action={() => alert(i18n.t("LOCKED_WALLET"))}
            // action={() => this.sendToken()}
            loading={modal.loading}
          />
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.handleQrCodeReader()}</div>;
  }
}

SendBox.propTypes = {
  coin: PropTypes.string.isRequired,
  coins: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  modal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired,
  setWalletTransaction: PropTypes.func.isRequired,
};

const mapSateToProps = (store) => ({
  user: store.user.user,
  modal: store.wallet.modal,
  coins: store.skeleton.coins
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setWalletSendModalLoading,
      setWalletTransaction,
      getWalletSendModalFee,
      getWalletTransferAvailable
    },
    dispatch
  );

export default connect(mapSateToProps, mapDispatchToProps)(SendBox);
