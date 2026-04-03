import { useParams } from "react-router-dom"

function Profile() {
    const { id } = useParams();

    return (
        <h1>Profile ID: {id}</h1>
    )
}