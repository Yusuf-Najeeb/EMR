"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";

//** MUI imports */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";

//** Third-Party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** Components & Utils import
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentBookingSchema } from "@/Schema";
import { formatDateToYYYMMDDD } from "../utils/format";
import {
  getAllDepartments,
  getAllServices,
  getPatients,
  getAvailableDoctors,
  bookAppointment,
} from "@/store";
import { patientName } from "@/utils/utils";
import Loading from "../components/Loading";
import AddPatient from "../components/AddPatient";

export default function Form() {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartment] = useState([]);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [verifyPatient, setVerifyPatient] = useState(false);
  const [patients, setPatient] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [key, setKey] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [newPatient, setNewPatient] = useState(true);

  const handleCheck = () => {
    setNewPatient(!newPatient);
  };

  const defaultValues = {
    patientId: "",
    departmentId: "",
    serviceId: "",
    doctorId: "",
    appointmentDate: "",
    time: "",
    message: "",
    verifyPatient: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(appointmentBookingSchema),
  });

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const getTime = useWatch({ control, name: "time" });
  const getDate = useWatch({ control, name: "appointmentDate" });
  const formatDate = formatDateToYYYMMDDD(getDate);
  const getDepartment = useWatch({ control, name: "departmentId" });

  useEffect(() => {
    setTime(getTime);
    setSelectedDepartmentId(getDepartment);
    setDate(formatDate);
  }, [formatDate, getTime, getDepartment]);

  const handleData = (data) => {
    const { appointmentDate, time, departmentId, ...restOfData } = data;
    const formattedDate = formatDateToYYYMMDDD(appointmentDate);

    const payload = {
      date: formattedDate,
      time,
      departmentId: departmentId,
      ...restOfData,
    };
    if (payload) {
      onSubmit(payload);
    }
  };

  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      const FinalResponse = await bookAppointment(payload);
      console.log(data, "Payload received successfully");
      console.log(FinalResponse);
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message || "error occurred!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allDepartments = await getAllDepartments();
        const allServices = await getAllServices();

        setDepartment(allDepartments);
        setServices(allServices);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error?.message || "error occurred!");
      }
    };

    fetchData();
  }, []);

  const watchPatientId = useWatch({ control, name: "patientId" });

  useEffect(() => {
    if (key !== watchPatientId) {
      setKey(watchPatientId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchPatientId]);

  const patientData = async (key) => {
    try {
      setLoading(true);

      const data = await getPatients(key);

      if (data?.patient) {
        setPatient(...[data?.patient[0]]);
        setVerifyPatient(true);
      }

      if (data?.patients) {
        setPatient(...[data?.patients]);
        setVerifyPatient(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message || "error occurred!");
    }
  };

  useEffect(() => {
    const getDoctor = async (selectedDepartmentId, time, date) => {
      try {
        setLoading(true);
        const availableDoctors = await getAvailableDoctors(
          selectedDepartmentId,
          time,
          date
        );
        const doctorsArray = availableDoctors?.availableDoctors;
        setDoctors(doctorsArray);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error?.message || "error occurred!");
      }
    };
    const FetchDoctors = async () => {
      if (date && time && selectedDepartmentId) {
        getDoctor(selectedDepartmentId, time, date);
      }
    };
    FetchDoctors();
  }, [date, time, selectedDepartmentId]);

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "75%" },
        borderRadius: 2,
        p: { xs: 3, md: 6 },
        boxShadow: "rgba(0, 24, 78, 0.25) 0px 5px 15px",
        my: 5,
        mx: "auto",
        background: "white",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: "2rem",
          fontWeight: "400",
        }}
      >
        Book An Appointment
      </Typography>
      <Typography>
        Do you have a Patient ID?
        <Checkbox checked={newPatient} onChange={handleCheck} />
      </Typography>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <form onSubmit={handleSubmit(handleData)}>
            <Collapse in={!newPatient}>
              <Grid container spacing={4} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={4}>
                  <Controller
                    name="surname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Surname"
                        placeholder="John"
                        value={value}
                        onChange={onChange}
                        required
                        error={Boolean(errors?.surname)}
                        {...(errors?.surname && {
                          helperText: "Patient surname is required ",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Controller
                    name="other_names"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Other Names"
                        placeholder="John Doe"
                        value={value}
                        onChange={onChange}
                        required
                        error={Boolean(errors?.other_names)}
                        {...(errors?.other_names && {
                          helperText: "Other names required",
                        })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        required
                        placeholder="Example@mail.com"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.email)}
                        {...(errors?.email && {
                          helperText: "Email is required",
                        })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Controller
                    name="phone_number"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Phone Number"
                        required
                        placeholder="+234-80-0000-0000"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.phone_number)}
                        {...(errors?.phone_number && {
                          helperText: "Phone number is required",
                        })}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Gender"
                        select
                        required
                        sx={{ width: "100%" }}
                        onChange={onChange}
                        placeholder="male/female/other"
                        error={Boolean(errors?.gender)}
                        {...(errors?.gender && {
                          helperText: errors?.gender?.message,
                        })}
                      >
                        <MenuItem value="">Choose your Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} id="datePicker">
                  <Controller
                    name="date_of_birth"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        sx={{ width: "100%", overflow: "hidden" }}
                        selected={value}
                        popperPlacement="bottom-end"
                        showYearDropdown
                        showMonthDropdown
                        onChange={(e) => onChange(e)}
                        placeholderText="2022-05-07"
                        customInput={
                          <TextField
                            fullWidth
                            sx={{
                              width: "100%",
                              minWidth: { xs: 395, lg: "100%" },
                            }}
                            label="Date of Birth"
                            required
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.date_of_birth)}
                            {...(errors?.date_of_birth && {
                              helperText: "Date of birth is required",
                            })}
                          />
                        }
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Nationality"
                        required
                        placeholder="Enter your Nationality"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.address)}
                        {...(errors?.address && {
                          helperText: "Nationality is required",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="countryOfResidence"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Country of Residence"
                        required
                        placeholder="Country you currently live"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.address)}
                        {...(errors?.address && {
                          helperText: "Resident Country required",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Collapse>

            <Collapse in={newPatient} sx={{ minWidth: "100%" }}>
              <Grid container spacing={4} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="patientId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Patient ID"
                        placeholder="Enter Email/Phone/User-ID"
                        value={value}
                        onChange={onChange}
                        onBlur={() => patientData(key)}
                        required
                        error={Boolean(errors.username)}
                        {...(errors.username && {
                          helperText: "Email/Phone/User-ID is required ",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="verifyPatient"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        select
                        disabled={!verifyPatient}
                        label="Patient Info"
                        placeholder="Confirm your name"
                        value={value}
                        onChange={onChange}
                        required
                        error={Boolean(errors.verifyInfo)}
                        {...(errors.verifyInfo && {
                          helperText: "Patient Info is required",
                        })}
                      >
                        <MenuItem>Confirm details</MenuItem>
                        {patients.map((patient) => (
                          <MenuItem key={patient.id} value={patient.id}>
                            {patientName(patient, true)}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
              </Grid>
            </Collapse>

            <Grid container spacing={4} sx={{ py: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="departmentId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="Department"
                      required
                      select
                      placeholder="Select a Department"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.departmentId)}
                      {...(errors.departmentId && {
                        helperText: "Department is required",
                      })}
                    >
                      <MenuItem>Select Department</MenuItem>
                      {departments?.map((department) => (
                        <MenuItem key={department?.id} value={department?.id}>
                          {department?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="serviceId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      select
                      label="Services"
                      required
                      placeholder="What service do you need?"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.serviceId)}
                      {...(errors.serviceId && {
                        helperText: "Please select a service",
                      })}
                    >
                      <MenuItem>Select Service</MenuItem>
                      {services?.map((service) => (
                        <MenuItem key={service?.id} value={service?.id}>
                          {service?.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ py: 2 }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "space-between",
                }}
              >
                <Box id="timer">
                  <Controller
                    name="time"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type="time"
                        value={value}
                        required
                        onChange={onChange}
                        placeholder="00:00"
                        error={Boolean(errors.time)}
                        {...(errors.time && {
                          helperText: errors.time.message,
                        })}
                      />
                    )}
                  />
                </Box>

                <Box id="date_picker">
                  <Controller
                    name="appointmentDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        popperPlacement="bottom-end"
                        showYearDropdown
                        showMonthDropdown
                        onChange={(e) => onChange(e)}
                        placeholderText="2022-05-07"
                        customInput={
                          <TextField
                            label="Date"
                            required
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors.appointmentDate)}
                            {...(errors.appointmentDate && {
                              helperText: "Date is required",
                            })}
                          />
                        }
                      />
                    )}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="doctorId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      select
                      label="Doctor"
                      required
                      placeholder="Select a Doctor"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.doctorId)}
                      {...(errors.doctorId && {
                        helperText: "Please select a doctor",
                      })}
                    >
                      {doctors.length === 0 ? (
                        <MenuItem>No doctors found</MenuItem>
                      ) : (
                        <MenuItem>Select Staff</MenuItem>
                      )}
                      {doctors?.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.value}>
                          {doctor.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={4} sx={{ py: 2 }}>
              <Grid item xs={12} sm={12}>
                <Controller
                  name="message"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      label="Optional Message"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.message)}
                      {...(errors.message && {
                        helperText: errors.message.message,
                      })}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  background: "#23A455",
                  "&:hover": {
                    background: "#23A455",
                  },
                  fontSize: "12px",
                  ":focus": { outline: "none" },
                  px: 3,
                  py: 1,
                }}
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ ml: 3 }} />
                ) : (
                  "Make an Appointment"
                )}
              </Button>
            </Box>

            <Typography
              sx={{ fontSize: "1.35rem", mt: 2, textAlign: "center" }}
            >
              New to Deda Hospital?{" "}
              <Button
                onClick={handleOpenModal}
                sx={{
                  color: "#23A455",
                  ":focus": { outline: "none" },
                  textDecoration: "underline",
                  "&:hover": { textDecoration: "none" },
                }}
              >
                Create Profile
              </Button>
            </Typography>
          </form>
        </Box>
      )}
      <AddPatient open={openModal} close={toggleModal} />
    </Box>
  );
}
