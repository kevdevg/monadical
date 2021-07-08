import {makeStyles} from "@material-ui/styles";
import Cell from "./Cell";

const useStyles = makeStyles((theme) => ({
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        color: "gray",
        '&:hover': {
            color: "green",
            cursor: "pointer"
        }
    },
    pick: {
        height: 30,
        width: 30,
        marginRight: 10,
        transition: "transform .7s ease-in-out",
        '&:hover': {
            color: "green",
            cursor: "pointer",
            transform: "rotate(-15deg) rotate(50deg)"
        }
    },
    rightPick: {
        height: 30,
        transform: "scaleX(-1)",
        width: 30,
        marginLeft: 10,
        transition: "transform .7s ease-in-out",
        '&:hover': {
            color: "green",
            cursor: "pointer",
            transform: "scaleX(-1) rotate(-15deg) rotate(50deg)"
        }
    }
}));
const Row = ({row, putStack, yourTurn}) => {
    const classes = useStyles()
    return (
        <div className={classes.row}>
            <div>
                <img className={classes.pick} src="/characters/pick.png"
                     style={!yourTurn ? {visibility: "hidden"} : {}}
                     onClick={() => {
                         putStack("L")
                     }}/>
            </div>
            {row.map(cell => <Cell cell={cell}/>)}
            <div>
                <img className={classes.rightPick} src="/characters/pick.png"
                     style={!yourTurn ? {visibility: "hidden"} : {}}
                     onClick={() => {
                         putStack("R")
                     }}/>
            </div>
        </div>
    );
}

export default Row;
