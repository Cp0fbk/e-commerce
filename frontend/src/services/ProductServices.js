import axios from "axios";

export async function getAllProducts() {
  try {
    const result = await axios.get("http://localhost:8080/api/products");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllDevices() {
  try {
    const result = await axios.get("http://localhost:8080/api/devices");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllAccessory() {
  try {
    const result = await axios.get("http://localhost:8080/api/accessories");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getTotalSalesOfPL(productLineId, startDate, endDate) {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/orders/total-sales",
      {
        params: {
          productLineId,
          startDate,
          endDate,
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopSellingProducts(minQuantitySold, date) {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/employees/top-selling-products",
      {
        params: {
          minQuantitySold,
          date,
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}
