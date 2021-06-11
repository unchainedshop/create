import ThemedButton from './theme-button';

const ThemeBar = ({ changeTheme, theme }) => {
  return (
    <div className="container">
      <ThemedButton onClick={changeTheme}>
        {' '}
        {theme.color === '#000000' ? 'Light' : 'Dark'}{' '}
      </ThemedButton>
    </div>
  );
};

export default ThemeBar;
