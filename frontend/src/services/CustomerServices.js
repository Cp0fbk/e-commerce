import axios from "axios";

export async function getAllCustomers() {
  try {
    const result = await axios.get("http://localhost:8080/api/customers");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addCustomer(newCustomer) {
  try {
    const result = await axios.post(
      "http://localhost:8080/api/customers",
      newCustomer
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteCustomer(id) {
  try {
    const result = await axios.delete(
      `http://localhost:8080/api/customers/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function ReactiveCustomer(id) {
  try {
    const result = await axios.put(
      `http://localhost:8080/api/customers/${id}/reactivate`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCustomerById(id) {
  try {
    const result = await axios.get(`http://localhost:8080/api/customers/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateCustomer(currCustomer, id) {
  try {
    const result = await axios.put(
      `http://localhost:8080/api/customers/${id}`,
      currCustomer
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getCustomersHighestOrderAmount(
  number,
  startDate,
  endDate
) {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/orders/highest-order-amount",
      {
        params: {
          number,
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
