import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function ScanScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return <Text>Chargement...</Text>;
  }

  if (!permission.granted) {
    return <Text>L'accès à la caméra est refusé.</Text>;
  }

  const handleBarcodeScanned = async ({ data }) => {
    if (data !== scannedData) {
      setScannedData(data);
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.net/api/v2/product/${data}`
        );
        setItem(response.data);
        navigation.navigate("ScanResult", { item: response.data }); // Modifier ici pour passer les données
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setItem(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        facing={facing}
        onBarcodeScanned={handleBarcodeScanned}
        autoFocus="on"
        flashMode="off"
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "ean13",
            "aztec",
            "codabar",
            "code128",
            "code39",
            "code93",
            "datamatrix",
            "ean8",
            "itf14",
            "pdf417",
            "upc_a",
            "upc_e",
          ],
        }}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "70%",
    height: "30%",
  },
});
