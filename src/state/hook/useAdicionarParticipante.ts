import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState);
    const lista = useRecoilValue(listaParticipantesState);
    const setErro = useSetRecoilState(erroState);

    return (nomeDoParticipante: string) => {
        if (lista.includes(nomeDoParticipante)){
            setErro('Nomes duplicados não são permitidos!');
            setTimeout(() => {
                setErro("");
            }, 5000); //para a mensagem durar 5 segundos
            return //early return para não setar a lista como na linha abaixo
        }
        return setLista(listaAtual => [...listaAtual, nomeDoParticipante]);
    }
}