import Logar from "../components/logar"

export default function Login({user, setUser}){
    return(
        <>
        <Logar user={user} setUser={setUser}/>
        </>
    )
}