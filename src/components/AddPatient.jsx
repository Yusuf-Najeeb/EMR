"use client";
import React, { useState, useEffect } from "react";

//** MUI imports */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

//** Third-Party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** Components & Utils import
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPatientSchema } from "@/Schema";
import { createPatient } from "@/store";
import Loading from "../components/Loading";

const AddPatient = ({ open, close }) => {
  // ** States
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    surname: "",
    other_names: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await createPatient(data);
      console.log(data, "Payload received successfully");
      console.log(response);
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message || "error occurred!");
    }
  };
  return (
    <Dialog
      fullWidth
      open={open}
      maxWidth="lg"
      scroll="body"
      sx={{
        "& .MuiDialog-paper": {
          overflow: "visible",
          width: "100%",
          maxWidth: 880,
        },
      }}
    >
      <DialogContent
        sx={{
          pb: (theme) => [
            `${theme.spacing(4)} !important`,
            `${theme.spacing(4)} !important`,
          ],
          pt: (theme) => [
            `${theme.spacing(2)} !important`,
            `${theme.spacing(4)} !important`,
          ],
        }}
      >
        <Typography variant="h5" sx={{ fontSize: "2rem", fontWeight: "400" }}>
          Create New Patient
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
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
                        //   onBlur={() => patientData(key)}
                        required
                        error={Boolean(errors?.surname)}
                        {...(errors?.surname && {
                          helperText: "Patient surname is required ",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="other_names"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        //   disabled={!verifyPatient}
                        label="Other Names"
                        placeholder="John Doe"
                        value={value}
                        onChange={onChange}
                        required
                        error={Boolean(errors?.other_names)}
                        {...(errors?.other_names && {
                          helperText: "Enter your other names is required",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
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
                          helperText: "Email address is required",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
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
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
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
                <Grid item xs={12} sm={12} md={6}>
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
                              minWidth: { xs: 595, lg: 390 },
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
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: 2,
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
                    color: "#fff",
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
                    "Create"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    close();
                    reset();
                  }}
                  variant="tonal"
                  sx={{
                    background: "#23A455ae",
                    "&:hover": {
                      background: "#23A455ee",
                    },
                    fontSize: "12px",
                    color: "#fff",
                    ":focus": { outline: "none" },
                    px: 3,
                    py: 1,
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPatient;
