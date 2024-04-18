import { Image, StyleSheet } from "react-native";
const Header = () => {
  return <Image source={require("../assets/Logo.png")} style={styles.logo} />;
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    height: 45,
    width: 45,
    resizeMode: "contain",
  },
});
