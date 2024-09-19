import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";



function TodoItem({todo,fetchTodoDetails}){

    return (
        <div>
            <Card sx={{
                maxWidth: '350px',
                minHeight: '225px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'

            }} >
                <CardContent>
                  <Typography variant="h5" color={"text.secondary"} >{todo?.todo}</Typography>  
                </CardContent>
                <CardActions>
                    <Button

                    onClick={() => fetchTodoDetails(todo?.id)}
                    
                    sx={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                        opacity: 0.75,
                        '&:hover' : {
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            opacity: 1,
                        }

                    }}>Details</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default TodoItem;