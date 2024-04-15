import React from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native"; // Importez useRoute

export default function ScanResult() {
  const route = useRoute(); // Utilisez useRoute pour obtenir l'objet route
  const { item } = route.params; // Accédez aux params

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Informations du produit :</Text>
        <Text>{item.code}</Text>
        <Text>{item.name}</Text>
        <Text>{item.product.generic_name}</Text>
        <Text>{item.product.product_quantity}</Text>
        <Text>{item.product.product_quantity_unit}</Text>
        <Text>{item.product.quantity}</Text>
        <Text>{item.product.additives_n}</Text>
        <Text>{item.product.brands}</Text>
        <Text>{item.product.grade}</Text>
        <Text>{item.product.allergens}</Text>
        {/* <Image
          source={{
            uri: item.product.image_url,
          }}
        /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
