import {useEffect, useState} from "react";
import Row from "./Row";
import {Typography} from "@material-ui/core";
import {useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/styles";
import useWebSocket from "react-use-websocket";
import {BASE_URL} from "../../constants";

const Game = () => {
    const {state = {}} = useLocation();
    let {identifier} = state;
    const socketUrl = `ws://${BASE_URL}/ws/game/${identifier}/`;
    const [player, setPlayer] = useState(0)
    const [turn, setTurn] = useState(0)
    const [winner, setWinner] = useState(0)
    const [board, setBoard] = useState([])

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
        boardContainer: {
            backgroundColor: "rgb(161 148 148 / 20%)",
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            paddingBottom: 25,
            borderRadius: 15
        },
        characterContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        character: {
            height: 350,
            width: 300
        },
        character2: {
            height: 350,
        },
        turn: {
            height: 50,
            width: "min-content",
        }
    }));
    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket(socketUrl, {
        onOpen: () => {
        },
        onError: (e) => console.log(e, 'error'),
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        if (lastJsonMessage) {
            switch (lastJsonMessage.type) {
                case "initial_setup": {
                    setPlayer(lastJsonMessage.player)
                    break
                }
                case "game_status": {
                    setTurn(lastJsonMessage.turn)
                    setBoard(lastJsonMessage.board)
                    setWinner(lastJsonMessage.winner)
                    break
                }
                default : {
                    break
                }
            }
        }
    }, [lastJsonMessage])

    const yourTurn = turn === player
    const classes = useStyles()
    return (
        <div className={classes.mainContainer}>
            <div style={{width: '100%'}}>
                <img src="/characters/title.png"/>
                <Typography style={{color: "white"}} variant="h5">
                    Your room code is <b>{identifier}</b>
                </Typography>
                <Typography style={{color: "white"}} variant="p">
                    {turn > 0 ? "Click on the pick to makes a movement" : "Waiting for your opponent"}
                </Typography>
            </div>
            <div style={{width: '100%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <div className={classes.characterContainer}>
                    <img className={classes.character} style={player === 2 ? {filter: 'grayscale(100%)'} : {}}
                         src={"/characters/player1.png"}/>
                    {player === 1 ? (
                        winner > 0 ? (
                                <img className={classes.turn}
                                     src={winner === player ? "/characters/you-win.png" : "/characters/you-lose.png"}/>
                            ) :
                            yourTurn ? (
                                <img className={classes.turn} src={"/characters/your-turn.png"}/>
                            ) : <img className={classes.turn} src={"/characters/wait.png"}/>
                    ) : null}

                </div>
                <div className={classes.boardContainer}>
                    {board.map((row, i) => (
                        <Row row={row} yourTurn={yourTurn && winner === 0} putStack={(side) => {
                            sendJsonMessage({
                                type: 'movement',
                                player: player,
                                side: side,
                                row: i,
                            })
                        }}/>
                    ))}
                </div>
                <div className={classes.characterContainer}>
                    <img className={classes.character2} style={player === 1 ? {filter: 'grayscale(100%)'} : {}}
                         src={"/characters/player2.png"}/>
                    {player === 2 ? (
                        winner > 0 ? (
                                <img className={classes.turn}
                                     src={winner === player ? "/characters/you-win.png" : "/characters/you-lose.png"}/>
                            ) :
                            yourTurn ? (
                                <img className={classes.turn} src={"/characters/your-turn.png"}/>
                            ) : <img className={classes.turn} src={"/characters/wait.png"}/>
                    ) : null}
                </div>
            </div>

        </div>

    );
}


export default Game;
