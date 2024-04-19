export const getAllDepartments = async () => {
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

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllServices = async (department_id) => {
  try {
    const response = await fetch(
      "https://immortal-lab-key.ngrok-free.app/public/consultancy/services",
      {
        method: "POST",
        body: JSON.stringify({ department_id }),
        headers: {
          "Content-type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPatients = async (key) => {
  try {
    const response = await fetch(
      "https://immortal-lab-key.ngrok-free.app/public/verify-patient/details",
      {
        method: "POST",
        body: JSON.stringify({ key }),
        headers: {
          "Content-type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
