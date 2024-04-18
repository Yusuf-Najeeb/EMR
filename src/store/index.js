export const getDepartments = async () => {
  try {
    const response = await fetch(
      "https://immortal-lab-key.ngrok-free.app/public/has-appointment/departments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const data = await response.json();
    console.log(data.data);

    return data;
  } catch (err) {
    console.log(err.stack);
  }
};
