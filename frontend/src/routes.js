import WelcomeScreen from "./pages/WelcomeScreen";
import Game from "./pages/Game/Game";

const routes = [
    {
        path: '/',
        element: <WelcomeScreen/>,
    },
    {
        path: '/game/:identifier/:action',
        element: <Game/>,
    }
]

// we need to add the JoinComponent for redirects !important
export default routes