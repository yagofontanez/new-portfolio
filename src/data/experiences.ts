export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  achievements: string[];
  stack: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    role: "Desenvolvedor Web Fullstack",
    company: "Um Clique Digital",
    location: "Dois Córregos, SP",
    period: "ago/2024 — Atual",
    current: true,
    achievements: [
      "Arquitetou interfaces React/TypeScript reduzindo retrabalho de design em ~40%.",
      "Refatorou o módulo de chat web com tipagem estrita eliminando bugs recorrentes.",
      "Desenvolveu monitoramento de grupos WhatsApp com relatórios de inteligência competitiva para o setor solar.",
      "Implementou pipelines n8n com agentes de IA, reduzindo tempo de resposta ao cliente em ~60%.",
    ],
    stack: ["React", "TypeScript", "Laravel", "Node.js", "AWS", "n8n"],
  },
  {
    role: "Desenvolvedor Web",
    company: "TDP Sistemas de Informação",
    location: "Dois Córregos, SP",
    period: "fev/2024 — ago/2024",
    achievements: [
      "Integrou WhatsChatIA ao sistema principal habilitando envio automatizado via WhatsApp.",
      "Identificou e corrigiu memory leaks críticos, melhorando estabilidade em produção.",
      "Implementou API da Meta para tracking de conversões e análise de campanhas.",
      "Resolveu bugs na integração iFood garantindo consistência no fluxo de pedidos.",
    ],
    stack: ["React", "Node.js", "Express", "Styled Components"],
  },
  {
    role: "Designer Gráfico",
    company: "TDP Sistemas de Informação",
    location: "Dois Córregos, SP",
    period: "ago/2023 — fev/2024",
    achievements: [
      "Produziu identidades visuais e artes aprovadas em primeira revisão.",
      "Arte-finalização e tratamento de imagens para impressão (cor, resolução, sangria).",
      "Desenvolveu ilustrações personalizadas reforçando o posicionamento de marcas.",
    ],
    stack: ["Illustrator", "Photoshop", "Figma", "Branding"],
  },
];
