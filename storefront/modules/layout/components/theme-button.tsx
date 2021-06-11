import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const ThemedButton = ({ ...rest }) => {
  const theme = useContext(ThemeContext);

  return <button type="button" {...rest} style={theme} />;
};
ThemedButton.contextType = ThemeContext;
export default ThemedButton;
