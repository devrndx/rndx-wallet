import React from "react";
import PropTypes from "prop-types";

// REDUX
import { connect } from "react-redux";

// COMPONENTS
import UserConfigure from "./userConfigure";

// STYLE
import style from "../../style.css";

class UserConfigureModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  renderContent = () => {
    let { modal, wallet } = this.props;
    return <UserConfigure coin={wallet.selectedCoin} />;
  };

  render() {
    return <div className={style.baseStep}>{this.renderContent()}</div>;
  }
}

UserConfigureModel.propTypes = {
  modal: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
};

const mapSateToProps = (store) => ({
  wallet: store.wallet,
  modal: store.wallet.modal,
});

export default connect(mapSateToProps, null)(UserConfigureModel);
