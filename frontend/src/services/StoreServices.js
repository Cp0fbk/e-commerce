import axios from "axios";

export async function getAllStores() {
  try {
    const result = await axios.get("http://localhost:8080/api/stores");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addStore(newStore) {
  try {
    const result = await axios.post(
      "http://localhost:8080/api/stores",
      newStore
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteStore(id) {
  try {
    const result = await axios.delete(`http://localhost:8080/api/stores/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

// export async function getEmployeeById(id) {
//   try {
//     const result = await axios.get(`http://localhost:8080/api/employees/${id}`);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function getStoreById(id) {
  try {
    const result = await axios.get(`http://localhost:8080/api/store/${id}`);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateStore(currStore, id) {
  try {
    const result = await axios.put(
      `http://localhost:8080/api/stores/${id}`,
      currStore
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}
