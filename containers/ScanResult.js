import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Collapsible from "react-native-collapsible";

export default function ScanResult() {
  const route = useRoute();
  const { item } = route.params;
  const [isCollapsed, setIsCollapsed] = useState(true); // Manage collapsed state with useState

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {item.product.image_url && (
        <Image
          source={{ uri: item.product.image_url }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      <Text>Code: {item.code}</Text>
      <Text>{item.product.generic_name}</Text>
      <Text>
        Quantity: {item.product.product_quantity}
        {item.product.product_quantity_unit}
      </Text>
      <Text>Additives Number: {item.product.additives_n}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => setIsCollapsed(!isCollapsed)}
      >
        <Text style={styles.btnText}>Plus de détails</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <Text>Brands: {item.product.brands}</Text>
        <Text>Ingredients: {item.product.ingredients_text_fr}</Text>
        <Text>Grade: {item.product.grade}</Text>
        <Text>Allergens: {item.product.allergens}</Text>
        {/* Ensure that `nutriscore_data` exists before accessing its properties */}
        {item.product.nutriscore_data && (
          <>
            <Text>Energy: {item.product.nutriscore_data.energy}</Text>
            <Text>Nutriscore Grade: {item.product.nutriscore_data.grade}</Text>
          </>
        )}
        {/* Handling the image */}
      </Collapsible>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "green",
    marginTop: 100,
    width: "50%",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
  },
});
