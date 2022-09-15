import React, { createContext, PropsWithChildren, useReducer } from "react";


export const WorkoutContext = createContext<any>(null);;

export const  workoutReducecr = (state:any, action:any) => {
      switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
        return {
            workouts:state.workouts.filter((el:any)=>el._id !== action.payload._id)
        }  
    default:
      return state
  }
}

export const WorkoutContextProvider:React.FC<PropsWithChildren> = ({children}) => {

    const [state, dispatch] = useReducer(workoutReducecr, {
        workouts:null
    });

    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
} 