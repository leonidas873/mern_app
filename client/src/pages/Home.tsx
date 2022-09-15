import Stack from '@mui/material/Stack';
import { Container } from '@mui/system';
import React from 'react'
import AddWorkout from '../components/AddWorkout'
import Header from '../components/Header'
import Workouts from '../components/Workouts'


const Home:React.FC = () => {
  return (
    <>
    <Header/>
    <Container sx={{marginTop:"40px"}}
    
    >
    <Stack
    direction={{ xs: 'column-reverse', sm: 'row' }}
    spacing={5}
    >
      <Workouts/>
      <AddWorkout/>
    </Stack>
    </Container>
    </>
  )
}

export default Home