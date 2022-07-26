import { useRecoilValue } from "recoil"
import { resultadoAmigoSecreto } from "../atom"

export const useResultadpSorteio = () => {
    return useRecoilValue(resultadoAmigoSecreto);
}