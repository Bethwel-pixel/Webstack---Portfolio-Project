import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import swal from "sweetalert";
import { userManagementClient } from "../../../config";
import { getAllUsers } from "../../../api/userservice";

const UsersForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [genderOptions, setGenderOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);
  const [filteredCountyOptions, setFilteredCountyOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formValues, setFormValues] = useState({
    Username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    genderId: "",
    created_by: "",
    updated_by: "",
    country: "",
    county: "",
  });
  const [error, setError] = useState(null);
  const base_url = "data";

  useEffect(() => {
    fetchData();
  }, [base_url]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const genderResponse = await getAllUsers("gender");
      const countryResponse = await getAllUsers("countries");
      const countyResponse = await getAllUsers("counties");

      setGenderOptions(genderResponse.data);
      setCountryOptions(countryResponse.data);
      setCountyOptions(countyResponse.data);

      if (props.data) {
        setFormValues({
          Username: props.data.Username,
          first_name: props.data.First_name,
          last_name: props.data.Last_name,
          email: props.data.User_email,
          phone: props.data.Phone_number,
          genderId: props.data.gender,
          created_by: props.data.created_by,
          updated_by: props.data.updated_by,
          country: props.data.country,
          county: props.data.county,
        });
        filterCountyOptions(props.data.country); // Automatically filter counties if editing
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (name === "country") {
      setSelectedCountry(value);
      filterCountyOptions(value);
    }
  };

  const filterCountyOptions = (countryId) => {
    const filteredOptions = countyOptions
      .filter((item) => item.CountryID === countryId)
      .map((item) => ({
        value: item.id,
        label: item.county,
      }));

    setFilteredCountyOptions(filteredOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const creator = sessionStorage.username;
      let response;

      if (props.isEditing) {
        formValues.updated_by = creator;
        response = await userManagementClient.put(
          `/update/${props.data.id}`,
          formValues
        );
      } else {
        formValues.created_by = creator;
        response = await userManagementClient.post("/data", formValues);
      }

      if (response) {
        swal("Success!", `${response.data.message}`, "success");
        props.onClose(); // Close the form
      }
    } catch (error) {
      swal("Error!", `${error.response.statusText}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Username"
            name="Username"
            value={formValues.Username}
            onChange={handleFieldChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="first_name"
            value={formValues.first_name}
            onChange={handleFieldChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            name="last_name"
            value={formValues.last_name}
            onChange={handleFieldChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleFieldChange}
            fullWidth
            required
            type="email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="phone"
            value={formValues.phone}
            onChange={handleFieldChange}
            fullWidth
            required
            type="tel"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Gender"
            name="genderId"
            value={formValues.genderId}
            onChange={handleFieldChange}
            fullWidth
            required
            select
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.gender}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleFieldChange}
            fullWidth
            required
            select
          >
            {countryOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.Country}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="County"
            name="county"
            value={formValues.county}
            onChange={handleFieldChange}
            fullWidth
            required
            select
            disabled={!selectedCountry}
          >
            {filteredCountyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              {props.isEditing ? "Update" : "Create"}
            </Button>
            <Button variant="outlined" onClick={props.onClose}>
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UsersForm;