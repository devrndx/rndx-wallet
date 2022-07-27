import React from "react";
import PropTypes from "prop-types";

// UTILS
import i18n from "../../../../utils/i18n";

// STYLE
import style from "../../style.css";

// COMPONENTS
import Loading from "../../../../components/loading";

class ButtonRegAuth extends React.Component {
  render() {
    const { action, loading, label = "등록", error } = this.props;
    return (
      <button
        className={!error ? style.btContinueDisable : style.btError}
        onClick={action}
      >
        {loading ? <Loading /> : label}
      </button>
    );
  }
}

ButtonRegAuth.propTypes = {
  action: PropTypes.func.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default ButtonRegAuth;
