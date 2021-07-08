import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    cell: {
        width: 70,
        height: 70,
        border: 'solid 0.5px',
        borderColor: "gray",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/characters/backgroundcube.jpg)"
    },
    icon: {
        width: '80% !important',
        height: '80% !important',
    },
    image: {
        width: '100%',
        height: '100%'
    }
}));
const Cell = ({cell}) => {
    const classes = useStyles()
    return (
        <div className={classes.cell}>
            {cell == 1 ? (
                <img className={classes.image} src="/characters/player1cube.png"/>
            ) : cell == 2 ? (
                <img className={classes.image} src="/characters/player2cube.png"/>
            ) : null}
        </div>
    );
}

export default Cell;
