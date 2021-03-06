import { Component } from "react";
import PropTypes from "prop-types";
import onClickOutside from "react-onclickoutside";

// Wrap component in this component to handle click outisde of that component
class ClickOutsideWrapper extends Component {
  static propTypes = {
    handleClickOutside: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
  };

  handleClickOutside = () => {
    const { handleClickOutside } = this.props;
    return handleClickOutside();
  };

  render = () => {
    const { children } = this.props;
    return children;
  };
}

export default onClickOutside(ClickOutsideWrapper);
