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

import Loading from "../../components/Loading";

const Registration = ({ open, close }) => {
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
      maxWidth="md"
      scroll="body"
      sx={{
        "& .MuiDialog-paper": {
          overflow: "visible",
          width: "100%",
          maxWidth: 650,
        },
      }}
    >
      <DialogContent
        sx={{
          pb: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
          pt: (theme) => [
            `${theme.spacing(8)} !important`,
            `${theme.spacing(12.5)} !important`,
          ],
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            p: { xs: 3, md: 6 },
            boxShadow: "rgba(0, 24, 78, 0.25) 0px 5px 15px",
            my: 5,
            mx: "auto",
            background: "white",
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
                          <MenuItem value="other">Other</MenuItem>
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
                                minWidth: { xs: 595, lg: 393 },
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
                      name="address"
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <TextField
                          fullWidth
                          label="Address"
                          required
                          placeholder="Enter your Address"
                          value={value}
                          onChange={onChange}
                          error={Boolean(errors?.address)}
                          {...(errors?.address && {
                            helperText: "Address is required",
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
                      fontSize: "12px",
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
                </Box>
              </form>
            </Box>
          )}
        </Box>
        {/* <Box sx={{ mt: 5, display: { xs: "none", md: "none" } }}>
          <img
            loading="lazy"
            decoding="async"
            width="683"
            height="300"
            src="https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2.png"
            class="attachment-full size-full wp-image-714"
            alt="Doctor posing with lab-coat"
            srcset="https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2.png 683w, https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2-205x300.png 205w, https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2-600x878.png 600w"
            sizes="(max-width: 683px) 100vw, 683px"
          />
        </Box> */}
      </DialogContent>
    </Dialog>
  );
};

export default Registration;
