import { Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { useWorkoutContext } from "../hooks/useWorkoutContext";


const url="http://localhost:8000/api/workouts";

interface IFormInputs {
  title: string;
  load: number;
  reps: number;
}

const schema = yup
  .object({
    title: yup.string().required(),
    load: yup.number().positive().integer().required(),
    reps: yup.number().positive().integer().required(),
  })
  .required();

const AddWorkout: React.FC = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const {workouts, dispatch} = useWorkoutContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: IFormInputs) => {
    setLoading(true)
    await axios.post(url, {
      ...data
    })
    .then(function (response) {
      console.log(response);
      dispatch({type:'CREATE_WORKOUT', payload:response.data})
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false)
    });
  }

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            marginBottom: "20px",
            fontWeight: 900,
          }}
        >
          add a new workout
        </Typography>
        <Stack
          direction="column"
          sx={{
            backgroundColor: "#ff2f2",
          }}
          spacing={2}
        >
          <TextField
            id="exercise-title"
            label="Exercise Title"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            {...register("title")}
            error={!!errors.title}
          />
          <TextField
            id="load"
            label="Load(in kg)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            {...register("load")}
            error={!!errors.load}
          />
          <TextField
            id="number-of-reps"
            label="Number of Reps"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
            {...register("reps")}
            error={!!errors.reps}
          />
                   <LoadingButton
          size="small"
          loading={loading}
          loadingIndicator="adding..."
            color="success"
            disableElevation={true}
            disableRipple={true}
            sx={{ width: "fit-content" }}
            type="submit"
          variant="contained"
        >add workout</LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

export default AddWorkout;
