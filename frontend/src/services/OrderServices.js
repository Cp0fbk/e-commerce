import axios from "axios";

export async function getAllOrders() {
  try {
    const result = await axios.get("http://localhost:8080/api/orders");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addOrder(newOrder) {
  try {
    console.log(newOrder);
    const result = await axios.post(
      "http://localhost:8080/api/orders",
      newOrder
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteOrder(id) {
  try {
    const result = await axios.delete(`http://localhost:8080/api/orders/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrder(currOrder, id) {
  try {
    const result = await axios.put(
      `http://localhost:8080/api/orders/${id}`,
      currOrder
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStatusOrder(currOrder, id) {
  try {
    const result = await axios.patch(
      `http://localhost:8080/api/orders/${id}`,
      currOrder
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addPLOrder(addProductLine, id) {
  try {
    console.log(addProductLine);
    const result = await axios.post(
      `http://localhost:8080/api/orders/${id}/productlines`,
      addProductLine
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deletePLOrder(deleteProductLine, id) {
  try {
    console.log(deleteProductLine);
    const result = await axios.delete(
      `http://localhost:8080/api/orders/${id}/productlines`,
      {
        data: deleteProductLine,
      }
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrdersByTime(startDate, endDate) {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/employees/customer-orders",
      {
        params: {
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
