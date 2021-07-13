import {Button, TextField, Typography} from "@material-ui/core";
import {createNewGame, joinToGame} from "../api/game";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
    const [npc, setNpc] = useState(false)
    const navigate = useNavigate()
    const classes = useStyles()
    return (
        <div className={classes.mainContainer}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={npc}
                        onChange={(e) =>{
                            setNpc(e.target.checked)
                        }}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Primary"
            />
            <Button onClick={async () => {
                const response = await createNewGame({npc})
                navigate(`/game/${response.identifier}/1`)
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
                navigate(`/game/`, {state: response})
            }} variant="contained">Join</Button>
        </div>
    )
}


export default WelcomeScreen;
