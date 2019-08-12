import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLocaleData } from "react-intl";
import { FormattedMessage } from "react-intl";
import en from "react-intl/locale-data/en";
import my from "react-intl/locale-data/my";
import zgh from "react-intl/locale-data/zgh";
import { IntlProvider } from "react-intl";
import { setLocale } from "../../actions/locale";
import { Skeleton } from "antd";
import classNames from "classnames";
import styles from "./index.module.less";
import Breadcrumb from "../Breadcrumb";
import messages from "../../utils/messages";

addLocaleData(en);
addLocaleData(my);
addLocaleData(zgh);

class PageHeader extends PureComponent {
  render() {
    const {
      title,
      subtitle,
      className,
      loading = false,
      wide = false,
      id,
      type,
      lang,
      parent,
      child,
      subchild
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);

    return (
      <IntlProvider locale={lang} messages={messages[lang]}>
        <div className={clsString}>
          <div className={wide ? styles.wide : ""}>
            <Skeleton
              loading={loading}
              title={false}
              active
              paragraph={{ rows: 3 }}
              avatar={{ size: "large", shape: "circle" }}
            >
              {/* <Breadcrumb id ={id} type= {type}/> */}
              <div style={{ marginBottom: "10px" }}>
                <span>
                  {!child &&
                    !subchild && (
                      <span style={{ color: "#0277BD" }}>
                        {parent && (
                          <FormattedMessage
                            id={parent}
                            defaultMessage={parent}
                          />
                        )}
                      </span>
                    )}
                </span>
                {!subchild && child && (
                  <span>
                    <span>
                      {parent && (
                        <FormattedMessage id={parent} defaultMessage={parent} />
                      )}
                    </span>
                    <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                      /
                    </span>

                    <span style={{ color: "#0277BD" }}>
                      {child && (
                        <FormattedMessage id={child} defaultMessage={child} />
                      )}
                    </span>
                  </span>
                )}
                {subchild && (
                  <span>
                    <span>
                      {parent && (
                        <FormattedMessage id={parent} defaultMessage={parent} />
                      )}
                    </span>
                    <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                      /
                    </span>
                    <span>
                      {child && (
                        <FormattedMessage id={child} defaultMessage={child} />
                      )}
                    </span>
                    <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                      /
                    </span>
                    <span style={{ color: "#0277BD" }}>
                      <FormattedMessage
                        id={subchild}
                        defaultMessage={subchild}
                      />
                    </span>
                  </span>
                )}
              </div>
              <div className={styles.detail}>
                <div className={styles.main}>
                  <div className={styles.row}>
                    {title && (
                      <h1 className={styles.title}>
                        <FormattedMessage id={title} defaultMessage={title} />
                      </h1>
                    )}
                  </div>
                  <div className={styles.row}>
                    {subtitle && (
                      <p className={styles.subtitle}>
                        <FormattedMessage
                          id={subtitle}
                          defaultMessage={subtitle}
                        />
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </IntlProvider>
    );
  }
}
PageHeader.propTypes = {
  lang: PropTypes.string
};

function mapStateToProps(state) {
  return {
    lang: state.locale.lang
  };
}
export default connect(
  mapStateToProps,
  { setLocale }
)(PageHeader);
