import {BASE_URL} from "../constants";

export const createNewGame = async ({npc}) => {
    const response = await fetch(`http://${BASE_URL}/create-game/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            npc
        })
    })
    return await response.json()
}

export const joinToGame = async (identifier) => {
    const response = await fetch(`http://${BASE_URL}/join-game/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier
        })
    })
    return await response.json()
}