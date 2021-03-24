import ConvitesEventos from './components/ConvitesEventos.vue'
import EventosParticipantes from './components/EventosParticipantes.vue'
import MeusEventos from './components/MeusEventos.vue'
import TodosEventos from './components/TodosEventos.vue'

export default [{
        path: '/convites-eventos',
        name: 'ConvitesEventos',
        component: ConvitesEventos
    },
    {
        path: '/eventos-participantes',
        name: 'EventosParticipantes',
        component: EventosParticipantes
    },
    {
        path: '/meus-eventos',
        name: 'MeusEventos',
        component: MeusEventos
    },
    {
        path: '/todos-eventos',
        name: 'TodosEventos',
        component: TodosEventos
    },
]