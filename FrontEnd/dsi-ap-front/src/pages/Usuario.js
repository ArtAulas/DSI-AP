
export default function Usuario(){
    return(
        <>
        <ul>
                <li>Nome:{user.nome}  {user.sobrenome}</li>
                <li>Email:{user.email}</li>
                <li>Telefone:{user.telefone}</li>
                <li>CPF:{user.cpf}</li>
        </ul>
        </>
    )
}