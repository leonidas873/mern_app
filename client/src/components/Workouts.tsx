import * as React from "react";
import Paper from "@mui/material/Paper";
import { styled, useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from 'date-fns'

const url = "http://localhost:8000/api/workouts";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    position: 'relative'
}));

const Workouts: React.FC = () => {
    
    const [error, setError] = React.useState('');
    const {workouts, dispatch} = useWorkoutContext();
    
    React.useEffect(()=>{
        axios.get(url)
        .then(res=>dispatch({type:'SET_WORKOUTS', payload:res.data}))
        .catch(res=>setError(res))
    },[dispatch])

    if (error) return <Stack direction="column" spacing={2} sx={{ flex: "1" }}><p>There is an error</p></Stack>
    if (!workouts) return <Stack direction="column" spacing={2} sx={{ flex: "1" }}><p>loading...</p></Stack>
    return (
        <Stack direction="column" spacing={2} sx={{ flex: "1" }}>
            {workouts?.map((el: any) => (
                <SingleWorkout key={el._id} createdAt={el.createdAt} id={el._id} title={el.title} reps={el.reps} load={el.load} />
            ))}
        </Stack>
    );
};

export default Workouts;

interface IWorkout {
    title: string
    load: number
    reps: number
    id: string
    createdAt:'string'
}

const SingleWorkout: React.FC<IWorkout> = ({ id, title, load, reps, createdAt }: IWorkout) => {
    const theme = useTheme();
    const [loading, setLoading] = React.useState<boolean>(false)
    const {workouts, dispatch} = useWorkoutContext();
    const deleteWorkout = async () => {
        setLoading(true)
        await axios.delete(`http://localhost:8000/api/workouts/${id}`)
            .then(res => dispatch({type:'DELETE_WORKOUT', payload:res.data}))
            .catch(error => console.log(error))
        setLoading(false)
    }

    return (
        <Item>
            <Stack
                sx={{
                    ul: {
                        padding: 0,
                        margin: "6px 0",
                    },
                    "ul li": {
                        listStyle: "none",
                    },
                }}
            >
                <Typography
                    variant="h5"
                    component="h5"
                    sx={{ color: theme.palette.success.light }}
                >
                    {title}
                </Typography>
                <ul>
                    <li>
                        <strong>load(kg):</strong> {load}
                    </li>
                    <li>
                        <strong>number of reps:</strong> {reps}
                    </li>
                    <li>{formatDistanceToNow(new Date(createdAt), {addSuffix: true})}</li>
                </ul>
            </Stack>


            <CustomLoadingBtn
                onClick={() => deleteWorkout()}
                loading={loading}
                variant="outlined"
                sx={{
                    border: 'none !important',
                    background: 'none',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '&:hover': {
                        border: 'none',
                        background: 'transparent',
                        transform: 'scale(1.1)'
                    },
                    position: 'absolute', top: '15px', right: '15px',
                }}
                disableElevation={true} disableRipple={true}
                startIcon={<DeleteIcon />}

            >

            </CustomLoadingBtn>

        </Item>
    );
};


const CustomLoadingBtn = styled(LoadingButton)(({ theme }) => ({
    padding: 0,
    background: 'transparent',
    minWidth: 'auto',
    '&:hover': {
        backgroundColor: 'transparent',
        border: 'none',

    },
    '&:active': {
        backgroundColor: 'transparent',
        border: 'none'
    }
})) as typeof LoadingButton;