import WelcomeScreen from "./pages/WelcomeScreen";
import Game from "./pages/Game/Game";

const routes = [
    {
        path: '/',
        element: <WelcomeScreen/>,
    },
    {
        path: '/game',
        element: <Game/>,
    }
]
export default routes