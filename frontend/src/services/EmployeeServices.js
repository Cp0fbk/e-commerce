import axios from "axios";

export async function getAllEmployees() {
  try {
    const result = await axios.get("http://localhost:8080/api/employees");

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addEmployee(newEmployee) {
  try {
    const result = await axios.post(
      "http://localhost:8080/api/employees",
      newEmployee
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function DeleteEmployee(id) {
  try {
    const result = await axios.delete(
      `http://localhost:8080/api/employees/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function ReactiveEmployee(id) {
  try {
    const result = await axios.patch(
      `http://localhost:8080/api/employees/${id}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getEmployeeById(id) {
  try {
    const result = await axios.get(`http://localhost:8080/api/employees/${id}`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateEmployee(currEmployee, id) {
  try {
    const result = await axios.put(
      `http://localhost:8080/api/employees/${id}`,
      currEmployee
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function searchEmployees(
  storeName,
  employeeName,
  phone,
  email,
  sortOption
) {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/employees/search",
      {
        params: {
          storeName,
          employeeName,
          phone,
          email,
          sortOption,
        },
      }
    );

    return result;
  } catch (error) {
    console.error(error);
  }
}
