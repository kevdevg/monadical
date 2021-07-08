import {Button, TextField, Typography} from "@material-ui/core";
import {createNewGame, joinToGame} from "../api/game";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100vh',
        flexDirection: "column",
        backgroundImage: "url(/characters/background.jpg)"
    },
}))

const WelcomeScreen = ({}) => {
    const [code, setCode] = useState("")
    const navigate = useNavigate()
    const classes = useStyles()
    return (
        <div className={classes.mainContainer}>
            <Button onClick={async () => {
                const response = await createNewGame()
                navigate('/game', {state: {identifier: response.identifier}})
            }} variant="contained">
                Create new game
            </Button>
            <Typography style={{color: "white", marginTop: 50}}>
                Or join to an existing one
            </Typography>
            <TextField
                onChange={(e) => setCode(e.target.value)}
                value={code} label="Room code" type='text'
                inputProps={{maxLength: 5}}
            />
            <Button onClick={async () => {
                const response = await joinToGame(code)
                navigate('/game', {state: response})
            }} variant="contained">Join</Button>
        </div>
    )
}


export default WelcomeScreen;
