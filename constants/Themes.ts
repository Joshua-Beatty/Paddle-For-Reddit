const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';


const Themes = {
  light: {
    dark: false,
    primary: 'rgba(93, 0, 255, 1)',
    primaryLink: 'rgba(93, 0, 255, 1)',
    primaryDisabled: 'rgba(143, 111, 198, 1)',
    background: 'rgb(242, 242, 242)',
    card: '#ddd',
    text: 'rgb(28, 28, 30)',
    textFaded: 'rgba(28, 28, 30, 0.3)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
    
    fontSize: 18,

    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    safeAreaColor: "#ddd",
  },
  dark: {
    dark: true,
    primary: 'rgba(93, 0, 255, 1)',
    primaryLink: 'rgba(139, 72, 255, 1)',
    primaryDisabled: 'rgba(143, 111, 198, 1)',
    background: 'rgba(0, 0, 0, 1)',
    card: 'rgba(25, 25, 25, 1)',
    text: 'rgba(235, 235, 235, 1)',
    textFaded: 'rgba(255, 255, 255, 0.3)',
    border: 'rgba(40, 40, 40, 1)',
    notification: 'rgb(255, 59, 48)',
    
    fontSize: 18,

    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    safeAreaColor: "rgba(25, 25, 25, 1)",
  },
};

type Theme = typeof Themes[keyof typeof Themes]

export default Themes
export type { Theme };
