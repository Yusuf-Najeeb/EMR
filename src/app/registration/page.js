"use client";
import React, { useState, useEffect } from "react";
// import "./globals.css";

//** MUI imports */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

//** Third-Party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** Components & Utils import
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPatientSchema } from "@/Schema";
import { formatDateToYYYMMDDD } from "../../utils/format";
import {
  getAllDepartments,
  getAllServices,
  getPatients,
  getAvailableDoctors,
  bookAppointment,
} from "@/store";
import { patientName } from "@/utils/utils";
import Loading from "../../components/Loading";

// ** fake-db
const patients = [];
const departments = [];
const services = [];
const doctors = [];

const Registration = () => {
  // ** States
  const [loading, setLoading] = useState(false);
  const [verifyPatient, setVerifyPatient] = useState(false);

  const defaultValues = {
    surname: "",
    otherNames: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(newPatientSchema),
  });

  const handleData = () => {
    console.log("nothing");
  };
  return (
    <Box
      sx={{
        width: { xs: "95%", md: "75%" },
        mx: "auto",
        borderRadius: 2,
        p: { xs: 3, md: 6 },
        my: 2,
        boxShadow: "rgba(0, 24, 78, 0.25) 0px 5px 15px",
      }}
    >
      <Typography variant="h5">Book Appointment</Typography>
      {loading ? (
        <Loading />
      ) : (
        <Box>
          <form onSubmit={handleSubmit(handleData)}>
            <Grid container spacing={6} sx={{ py: 2 }}>
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

            <Grid container spacing={6} sx={{ py: 2 }}>
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
                      <MenuItem>Select Staff</MenuItem>
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

            <Grid container spacing={6} sx={{ py: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="time"
                      value={value}
                      sx={{ mr: 3, width: "37%" }}
                      // label="Time"
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
                          sx={{ width: "100%" }}
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

            <Grid container spacing={6} sx={{ py: 2 }}>
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
                mt: "10px",
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
                  fontSize: "15px",
                  p: 2,
                }}
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={20} sx={{ ml: 3 }} />
                ) : (
                  "Book Appointment"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default Registration;
