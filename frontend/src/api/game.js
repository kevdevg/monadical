import {BASE_URL} from "../constants";

export const createNewGame = async () => {
    const response = await fetch(`http://${BASE_URL}/create-game/`, {
        method: 'POST'
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