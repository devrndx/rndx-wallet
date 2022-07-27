import React from "react";

// STYLE
import style from "../../style.css";

// UTILS
import i18n from "../../../../utils/i18n";

class BoxResult extends React.Component {
  render() {
    return (
      <div>

        <div className={style.modalBoxSubContainer}>
          <img src="/images/icons/confirm/confirm.png" />
          <div>
            <span className={style.totalConfirm}>
              {i18n.t("MODAL_SEND_INFO_SUCCESS")}
            </span>
          </div>
      </div>
      </div>

    );
  }
}

export default BoxResult;
