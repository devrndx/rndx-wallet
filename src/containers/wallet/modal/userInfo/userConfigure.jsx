import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWalletSendModalLoading } from "../../redux/walletAction";
import { resetUser } from "../../../user/redux/userAction";
import { clearMessage, errorInput } from "../../../errors/redux/errorAction";

// COMPONENTS
import ButtonRegAuth from "./buttonRegAuth.jsx";
import ButtonChangePassword from "./buttonChangePassword.jsx";

// UTILS
import i18n from "../../../../utils/i18n";
import { inputValidator } from "../../../../utils/inputValidator";

// STYLE
import style from "../../style.css";

class UserConfigure extends React.Component {
  constructor() {
    super();
    this.state = { address: "", isVisible: false };
  }

  changeAddress = (address) => this.setState({ address });

  showQrCodeReader = () => {
    let { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  validateAddress = () => {
    setWalletSendModalLoading();
    return;
  };

  inputValidator = () => {
    let { resetUser, clearMessage, errorInput, user } = this.props;

    clearMessage();
    resetUser(user.email);
    alert(i18n.t("RESET_EMAIL_SENDED"));
    return;
  };

  handleQrCodeReader = () => {
    let { address } = this.state;
    let { coin, user } = this.props;

    return (
      <div>
        <div className={style.modalBox}>
          <div className={style.modalBoxSubContainer}>
            <div>
              <h4>{i18n.t("PLACEHOLDER_FIRST_NAME")}</h4>
            </div>
            <div className={style.modalBoxValueContainer}>
              <h4>{user.name}</h4>
              <hr />
            </div>
          </div>
        </div>
        <div className={style.modalBox}>
          <div className={style.modalBoxSubContainer}>
            <div>
              <h4>{i18n.t("PLACEHOLDER_PHONE_NUM")}</h4>
            </div>
            <div className={style.modalBoxValueContainer}>
              <h4>{user.phonenum}</h4>
              <hr />
            </div>
          </div>
        </div>
        <div className={style.modalBox}>
          <div className={style.modalBoxSubContainer}>
            <div>
              <h4>{i18n.t("PLACEHOLDER_EMAIL")}</h4>
            </div>
            <div className={style.modalBoxValueContainer}>
              <h4>{user.email}</h4>
              <hr />
            </div>
          </div>
        </div>

        <div className={style.modalBox}>
          <div className={style.modalBoxSubContainer}>
            <ButtonChangePassword
              action={() => this.inputValidator()}
            />
          </div>
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.handleQrCodeReader()}</div>;
  }
}

UserConfigure.propTypes = {
  resetUser: PropTypes.func,
  clearMessage: PropTypes.func,
  errorInput: PropTypes.func,
  coin: PropTypes.string.isRequired,
  modal: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setWalletSendModalLoading: PropTypes.func.isRequired,
};

const mapSateToProps = (store) => ({
  user: store.user.user,
  modal: store.wallet.modal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetUser,
      clearMessage,
      errorInput,
      setWalletSendModalLoading,
    },
    dispatch
  );

export default connect(mapSateToProps, mapDispatchToProps)(UserConfigure);
