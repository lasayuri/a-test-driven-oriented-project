import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadpSorteio } from "../state/hook/useResultadoSorteio"
import Sorteio from "./Sorteio"

jest.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: jest.fn()
    }
})

jest.mock('../state/hook/useResultadoSorteio', () => {
    return {
        useResultadpSorteio: jest.fn()
    }
})

describe('na pagina de sorteio', () => {
    const participantes = [
        'Ana',
        'Catarina',
        'Jorel'
    ]

    const resultado = new Map([
        ['Ana', 'Jorel'],
        ['Jorel', 'Catarina'],
        ['Catarina', 'Ana']
    ])

    beforeEach(() => {
        (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
        (useResultadpSorteio as jest.Mock).mockReturnValue(resultado);
    })

    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render (
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const opcoes = screen.queryAllByRole('option');
        expect(opcoes).toHaveLength(participantes.length + 1);
    })

    test('o amigo secreto é exibido quando solicitado', () => {
        render(
            <RecoilRoot>
                <Sorteio />
            </RecoilRoot>
        )

        const select = screen.getByPlaceholderText('Selecione o seu nome');

        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const botao = screen.getByRole('button');
        fireEvent.click(botao);

        const amigoSecreto = screen.getByRole('alert');
        expect(amigoSecreto).toBeInTheDocument();
    })
})