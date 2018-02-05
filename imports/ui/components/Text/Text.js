import React from 'react';
import PropTypes from 'prop-types';

import './Text.scss';

const Text = ({ count }) => {
  return <div className="text-success">Button pressed {count} times.</div>
}

Text.propTypes = {
  count: PropTypes.number.isRequired,
};
 
export default Text;
