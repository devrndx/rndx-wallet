import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

// COMPONENTS
import Loading from "../../../../components/loading";

class ButtonChangePassword extends React.Component {
  render() {
    const { action, loading, label = i18n.t("SETTINGS_USER_PASSWORD"), error } = this.props;
    return (
      <button
        className={!error ? style.infoChangeButtonOnPopUp : style.btError}
        onClick={action}
      >
        {loading ? <Loading /> : label}
      </button>
    );
  }
}

ButtonChangePassword.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default ButtonChangePassword;
