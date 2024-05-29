export const formatPatientId = (patient) => {
  if (!patient) {
    return "";
  }

  let formattedId = String(patient.id);
  let len = 7 - formattedId.length;
  while (len >= 0) {
    formattedId = "0" + formattedId;
    len--;
  }

  const legacyId =
    patient.legacy_patient_id && patient.legacy_patient_id !== ""
      ? ` ${patient.legacy_patient_id}`
      : "";

  return `[${legacyId ? legacyId : formattedId}]`;
};

export const patientName = (user, pid = false) => {
  const patientId = pid ? `(${formatPatientId(user)})` : "";

  return user ? `${user.other_names} ${user.surname} ${patientId}` : "--";
};
