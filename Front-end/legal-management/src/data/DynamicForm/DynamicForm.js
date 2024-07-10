import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  MenuItem,
} from "@mui/material";
import swal from "sweetalert";

const DynamicForm = ({
  fields,
  onSubmit,
  onClose,
  isEditing,
  initialData = {},
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const initialValues = fields.reduce((acc, field) => {
    acc[field.name] = initialData[field.name] || field.value || "";
    return acc;
  }, {});

  const validationSchema = fields.reduce((acc, field) => {
    if (field.isRequired) {
      acc[field.name] = Yup.string().required(`${field.label} is required`);
    }
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      try {
        await onSubmit(values);
      } catch (error) {
        swal(
          "Error!",
          "Unable to complete operation, try again later",
          "error"
        );
      } finally {
        setLoading(false);
        setSubmitting(false);
        onClose();
      }
    },
  });

  if (loading) return <CircularProgress />;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              flex: "1 1 calc(50% - 16px)", // Adjusting for the gap between fields
              mb: 2,
            }}
          >
            {field.type === "select" ? (
              <TextField
                select
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
              >
                {field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                id={field.name}
                name={field.name}
                label={field.label}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
              />
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isEditing ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default DynamicForm;
