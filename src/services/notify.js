const baseAPI_URL = process.env.REACT_APP_BACKEND_API_BASE_ENDPOINT;

export async function notify(title, message) {
  const payload = {
    title: title,
    message: message
  };

  try {
    const response = await fetch(`${baseAPI_URL}/notify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log("Nofify response:", result);
    return result;
  } catch (error) {
    console.error("Error notifying:", error);
    //return result;
  }
}