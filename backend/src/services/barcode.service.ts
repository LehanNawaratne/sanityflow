import axios from "axios";

export const lookupBarcodeService = async (barcode: string) => {
  const response = await axios.get(
    `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
  );

  if (response.data.status === 0) {
    return null;
  }

  const product = response.data.product;

  return {
    name: product.product_name || "Unknown",
    brand: product.brands || "Unknown",
    category: product.categories || "Unknown",
    quantity: product.quantity || "Unknown",
  };
};