
import { Container, Box, Typography, useTheme  } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';

const CustomHeading = styled(Typography)(({ theme }) => ({
  fontWeight:theme.typography.fontWeightBold,
  color:theme.palette.grey[50],
  fontSize:20,
  [theme.breakpoints.up("sm")]: {
    fontSize:20
  },
  [theme.breakpoints.up("md")]: {
    fontSize:25
  },
  [theme.breakpoints.up("lg")]: {
    fontSize:35
  },
})) as typeof Typography;

const Header: React.FC = () => {

  const theme = useTheme();

  return (<Box sx={{ bgcolor: theme.palette.secondary.light }}
  >
    <Container
    sx={{ bgcolor: '#4c7ca4'
  
  }}
    >
        <CustomHeading variant="h3" component="h1" p={2} >Workout Plan</CustomHeading>
      

    </Container>
    </Box>
  )
}

export default Header