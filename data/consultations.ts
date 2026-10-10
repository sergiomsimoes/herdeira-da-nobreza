export type PaymentMethod = "pix" | "card";

export type PriceOption = {
  id: string;
  label: string;
  pix: number;
  card: number;
};

export type Extra = PriceOption & {
  note?: string;
};

export type Consultation = {
  id: string;
  name: string;
  shortName: string;
  category: "foto-audio" | "video";
  description: string;
  delivery: string;
  appointment: string;
  options: PriceOption[];
  extras: Extra[];
  highlights: string[];
};

const contextExtras: Extra[] = [
  { id: "texto", label: "Texto adicional", pix: 10, card: 17, note: "Contexto adicional, sem incluir novas perguntas." },
  { id: "audio-10", label: "Áudio adicional — 10 min", pix: 20, card: 27, note: "Contexto adicional, sem incluir novas perguntas." },
  { id: "audio-20", label: "Áudio adicional — 20 min", pix: 30, card: 37, note: "Contexto adicional, sem incluir novas perguntas." },
  { id: "prioridade", label: "Fura fila / atendimento prioritário", pix: 50, card: 57 },
];

export const consultations: Consultation[] = [
  {
    id: "perguntas-objetivas",
    name: "Tiragem de Perguntas Objetivas",
    shortName: "Perguntas Objetivas",
    category: "foto-audio",
    description: "Respostas rápidas de sim ou não, acompanhadas do porquê revelado pelas cartas, para dúvidas pontuais.",
    delivery: "Entrega em até 24 horas, por ordem de confirmação do pagamento.",
    appointment: "Sem agendamento",
    options: [
      { id: "1-pergunta", label: "1 pergunta objetiva", pix: 20, card: 27 },
      { id: "2-perguntas", label: "2 perguntas objetivas", pix: 30, card: 37 },
      { id: "3-perguntas", label: "3 perguntas objetivas", pix: 40, card: 47 },
    ],
    extras: contextExtras,
    highlights: ["Foto e áudio", "Uma questão por pergunta", "Pagamento confirmado antes da tiragem"],
  },
  {
    id: "pacotes-objetivas",
    name: "Pacotes de Perguntas Objetivas",
    shortName: "Pacotes Objetivos",
    category: "foto-audio",
    description: "Pacotes para analisar várias situações específicas com respostas diretas e explicação individual.",
    delivery: "Entrega em até 24 horas, por ordem de confirmação do pagamento.",
    appointment: "Sem agendamento",
    options: [
      { id: "5-perguntas", label: "5 perguntas objetivas", pix: 70, card: 77 },
      { id: "10-perguntas", label: "10 perguntas objetivas", pix: 150, card: 157 },
      { id: "15-perguntas", label: "15 perguntas objetivas", pix: 200, card: 207 },
    ],
    extras: contextExtras,
    highlights: ["Foto e áudio", "Quantidade conforme o pacote", "Contexto deve ser objetivo"],
  },
  {
    id: "perguntas-detalhadas",
    name: "Tiragem de Perguntas Detalhadas",
    shortName: "Perguntas Detalhadas",
    category: "foto-audio",
    description: "Leitura aprofundada para uma situação específica, com interpretação, orientação e direcionamento.",
    delivery: "Entrega em até 24 horas, por ordem de confirmação do pagamento.",
    appointment: "Sem agendamento",
    options: [
      { id: "1-detalhada", label: "1 pergunta detalhada", pix: 30, card: 37 },
      { id: "2-detalhadas", label: "2 perguntas detalhadas", pix: 60, card: 67 },
      { id: "3-detalhadas", label: "3 perguntas detalhadas", pix: 80, card: 87 },
    ],
    extras: contextExtras,
    highlights: ["Foto e áudio", "Resposta aprofundada", "Perguntas claras e específicas"],
  },
  {
    id: "previsao",
    name: "Tiragem de Previsão",
    shortName: "Previsão",
    category: "foto-audio",
    description: "Escolha uma área da vida e o período que deseja observar pelas tendências apresentadas nas cartas.",
    delivery: "Entrega em até 24 horas, por ordem de confirmação do pagamento.",
    appointment: "Sem agendamento",
    options: [
      { id: "semanal", label: "Semanal — 7 dias", pix: 40, card: 47 },
      { id: "mensal", label: "Mensal — 1 mês", pix: 60, card: 67 },
      { id: "trimestral", label: "Trimestral — 3 meses", pix: 100, card: 107 },
      { id: "anual", label: "Anual — 1 ano", pix: 190, card: 197 },
    ],
    extras: [contextExtras[3]],
    highlights: ["Foto e áudio", "Área da vida à escolha", "Tendências, não garantias absolutas"],
  },
  {
    id: "tiragem-livre",
    name: "Tiragem Livre",
    shortName: "Tiragem Livre",
    category: "video",
    description: "Faça quantas perguntas desejar dentro do tempo contratado, em atendimento individual ao vivo.",
    delivery: "Realizada na data e no horário confirmados.",
    appointment: "Requer agendamento",
    options: [
      { id: "30-min", label: "30 minutos", pix: 100, card: 107 },
      { id: "60-min", label: "1 hora", pix: 130, card: 137 },
    ],
    extras: [
      { id: "video-10", label: "Tempo adicional — 10 min", pix: 30, card: 37 },
      { id: "video-20", label: "Tempo adicional — 20 min", pix: 40, card: 47 },
    ],
    highlights: ["Videochamada", "Lista de perguntas com 1 dia de antecedência", "Tempo de contexto integra a duração"],
  },
  {
    id: "mesa-real",
    name: "Mesa Real",
    shortName: "Mesa Real",
    category: "video",
    description: "A leitura mais completa do Baralho Cigano, com as 36 cartas e análise do quadro geral da vida.",
    delivery: "Realizada na data e no horário confirmados.",
    appointment: "Requer agendamento",
    options: [{ id: "mesa-60", label: "Mesa Real — 1 hora", pix: 180, card: 187 }],
    extras: [
      { id: "cinco-pos", label: "5 perguntas objetivas pós-consulta", pix: 40, card: 47 },
      { id: "guia", label: "Guia espiritual personalizado", pix: 80, card: 87, note: "Disponível após a tiragem de Mesa Real." },
    ],
    highlights: ["Videochamada", "Todas as 36 cartas", "Recomendação informada: a cada 3 meses"],
  },
  {
    id: "emergencial",
    name: "Tiragem Emergencial",
    shortName: "Emergencial",
    category: "video",
    description: "Atendimento prioritário por videochamada para situações urgentes, sujeito à disponibilidade de encaixe.",
    delivery: "Atendimento na hora, conforme disponibilidade.",
    appointment: "Contato e confirmação imediatos",
    options: [{ id: "emergencial", label: "Tiragem Livre ou Mesa Real", pix: 300, card: 307 }],
    extras: [],
    highlights: ["Videochamada", "Prioridade", "Disponível também em fins de semana, conforme agenda"],
  },
];
