import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    fontFamily: "Nunito_700Bold",
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingBottom: 0,
  },
  titleText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#333",
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  inputSmall: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: "23%",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 6,
  },
});
