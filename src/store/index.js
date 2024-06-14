const reqUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllDepartments = async () => {
  try {
    const response = await fetch(
      `${reqUrl}public/has-appointment/departments`,
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
    const response = await fetch(`${reqUrl}public/consultancy/services`, {
      method: "POST",
      body: JSON.stringify({ department_id }),
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getPatients = async (key) => {
  try {
    const response = await fetch(`${reqUrl}public/verify-patient/details`, {
      method: "POST",
      body: JSON.stringify({ key }),
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAvailableDoctors = async (departmentId, time, date) => {
  try {
    const response = await fetch(`${reqUrl}public/check-availability`, {
      method: "POST",
      body: JSON.stringify({
        date,
        hour: time,
        departmentId,
      }),
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok)
      throw new Error("Error fetching doctors", response.status);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const bookAppointment = async (query) => {
  const {
    departmentId,
    serviceId,
    patientId,
    doctorId,
    date,
    time,
    ...restOfData
  } = query;
  try {
    const response = await fetch(
      "https://immortal-lab-key.ngrok-free.app/public/bookings/new",
      {
        method: "POST",
        body: JSON.stringify({
          ...restOfData,
          appointment_date: `${date} ${time}`,
          isAdvanced: true,
          doctor_id: doctorId,
          department_id: departmentId,
          patient_id: patientId,
          service_id: serviceId,
        }),
        headers: {
          "Content-type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    if (!response.ok)
      throw new Error("Error fetching doctors", response.status);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPatient = async (query) => {
  const {
    departmentId,
    serviceId,
    patientId,
    doctorId,
    date,
    time,
    ...restOfData
  } = query;
  try {
    const response = await fetch(`${reqUrl}public/bookings/new`, {
      method: "POST",
      body: JSON.stringify({
        isAdvanced: true,
        department_id: departmentId,
        service_id: serviceId,
        patient_id: patientId,
        doctor_id: doctorId,
        appointment_date: `${date} ${time}`,
        ...restOfData,
      }),
      headers: {
        "Content-type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    if (!response.ok)
      throw new Error("Error creating patient", response.status);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};
