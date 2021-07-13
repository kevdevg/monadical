import {useParams} from "react-router-dom";
import {useEffect} from "react";

const JoinComponent = () => {
    let { identifier } = useParams();
    useEffect(() => {

    }, [identifier])
    return (
        <>
        </>
    )
}
export default JoinComponent