"use client";
import Link from "next/link";
// import CustomTextField from "src/@core/components/mui/text-field";

import {
  Button,
  Box,
  Typography,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { appointmentBookingSchema } from "@/Schema";

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

export default function Form() {
  const defaultValues = {
    username: "",
    department: "",
    staff: "",
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
  return (
    <main>
      <Typography>Book Appointment</Typography>
      <Box>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Grid container spacing={6} sx={{ py: 2 }}>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name="Username"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label="Username"
                    required
                    placeholder="Enter Email/Phone/User-ID"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.username)}
                    {...(errors.username && {
                      helperText: "Email/Phone/User-ID is required ",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name="Department"
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
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name="Staff"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    fullWidth
                    label="Who you want to see"
                    required
                    placeholder="Who do you want to see?"
                    value={value}
                    onChange={onChange}
                    error={Boolean(errors.username)}
                    {...(errors.username && {
                      helperText: "This field is required",
                    })}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Controller
                name="Date"
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
                        placeholder="Choose a Date"
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
        </form>
      </Box>
    </main>
  );
}
