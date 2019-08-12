import { Button } from 'antd';
import React from 'react';
import styles from '../../styles/custom.module.less';

class CreateButton extends React.Component {
  render() {
    return (
      <Button className={styles.ButtonSizeLight} onClick={this.props.click}>
        {this.props.role?"Create New Role": `New ${this.props.btnName}`}
      </Button>
    );
  }
}

export default CreateButton;
