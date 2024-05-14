// services/api.ts
const API_URL = "https://dummyjson.com/todos";

export const fetchTodos = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const toggleTodoCompletion = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ completed: true }),
    });

    // Check if the request was not successful
    if (!response.ok) {
      throw new Error(`Failed to toggle completion status. Status: ${response.status}`);
    }

    // Parse response data
    const data = await response.json();

    // Return status and data
    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    // Handle errors
    console.error("Error toggling completion:", error);
    throw error;
  }
};

// services/todoAPI.ts
export const deleteTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Failed to delete todo. Status: ${response.status}`);
    }

    // Return status and data
    return {
      status: response.status,
      data: await response.json(),
    };
  } catch (error) {
    // Handle errors
    console.error("Error deleting todo:", error);
    throw error;
  }
};
