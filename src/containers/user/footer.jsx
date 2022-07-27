import React from "react";
import i18n from "../../utils/i18n";

// STYLE
import style from "./style.css";

class Footer extends React.Component {
  render() {
    return (
      <div className={style.footer}>
        <p>&copy; {i18n.t("LOGIN_FOOTER")}</p>
      </div>
    );
  }
}
export default Footer;
