"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
// import Link from "next/link";

import {
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentBookingSchema } from "@/Schema";
import Header from "./components/Header";
import Footer from "./components/Footer";

//Utils
import { getDepartments } from "@/store";

const departments = [
  {
    id: 1,
    value: "Cardiology",
    label: "Cardiology",
  },
  {
    id: 2,
    value: "Neurology",
    label: "Neurology",
  },
  {
    id: 3,
    value: "Orthopedics",
    label: "Orthopedics",
  },
];
const staffs = [
  {
    id: 1,
    value: "Dr. John Doe",
    label: "Dr. John Doe",
  },
  {
    id: 2,
    value: "Dr. Jane Doe",
    label: "Dr. Jane Doe",
  },
];
const doctors = [
  {
    id: 1,
    value: "Dr. Moe Derrick",
    label: "Dr. Moe Derrick",
  },
  {
    id: 2,
    value: "Dr. Jane Doe",
    label: "Dr. Jane Doe",
  },
];

export default function Form() {
  const [department, setDepartment] = useState([]);
  const defaultValues = {
    username: "",
    department: "",
    service: "",
    doctor: "",
    date: "",
    time: "",
    message: "",
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

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  useEffect(() => {
    const allDepartments = getDepartments();
    // setDepartment(allDepartments);
    console.log(allDepartments, "allDepartments");

    // console.log(department, "department");
  }, []);

  return (
    <>
      <Header />
      <Box
        sx={{
          width: "70%",
          mx: "auto",
          // border: "1px solid rgb(0, 24, 78)",
          borderRadius: 2,
          p: 6,
          my: 2,
          boxShadow: "rgba(0, 24, 78, 0.25) 0px 5px 15px",
        }}
      >
        <Typography>Book Appointment</Typography>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={6} sx={{ py: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="username"
                      placeholder="Enter Email/Phone/User-ID"
                      value={value}
                      onChange={onChange}
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
                  name="department"
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
                      error={Boolean(errors.department)}
                      {...(errors.department && {
                        helperText: "Department is required",
                      })}
                    >
                      <MenuItem>Select Department</MenuItem>
                      {departments.map((department) => (
                        <MenuItem key={department.id} value={department.value}>
                          {department.label}
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
                  name="service"
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
                      error={Boolean(errors.staff)}
                      {...(errors.staff && {
                        helperText: "Please select a service",
                      })}
                    >
                      <MenuItem>Select Staff</MenuItem>
                      {staffs.map((staff) => (
                        <MenuItem key={staff.id} value={staff.value}>
                          {staff.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      type="time"
                      value={value}
                      sx={{ mr: 2 }}
                      label="Time"
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
                  name="date"
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
                          fullWidth
                          label="Date"
                          required
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors.date)}
                          {...(errors.date && {
                            helperText: "Date is required",
                          })}
                        />
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={6} sx={{ py: 2 }}>
              <Grid item xs={12} sm={12} md={6}>
                <Controller
                  name="doctor"
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
                      error={Boolean(errors.doctor)}
                      {...(errors.doctor && {
                        helperText: "Please select a doctor",
                      })}
                    >
                      <MenuItem>Select Staff</MenuItem>
                      {doctors.map((doctor) => (
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
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={20} color="primary" sx={{ ml: 3 }} />
                ) : (
                  "Schedule Appointment"
                )}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
