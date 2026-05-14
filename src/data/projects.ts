import type { Project } from "../interfaces/interfaces";

export interface ProjectFull extends Project {
  slug: string;
  subtitle: string;
  tags: string[];
  status?: { label: string; color: string };
}

export const PROJECTS: ProjectFull[] = [
  {
    slug: "upstat",
    title: "UpStat",
    subtitle: "SaaS · Monitoramento de Uptime",
    description: `SaaS de monitoramento de uptime em produção com usuários pagantes — desenvolvido do zero.

Plataforma completa com synthetic monitoring, dependency map, alertas via e-mail/WhatsApp/SMS, status pages customizáveis com subdomínio próprio e notificações com double opt-in.

Ecossistema publicado: SDK npm, CLI em Go, Flutter SDK (pub.dev), MCP Server, Chrome Extension e AI Copilot (Groq/llama-3.3-70b).

Integrações de pagamento BR (Asaas + pague.dev/PIX), CPF/CNPJ criptografado com AES-256-GCM, auto-downgrade por webhook e roteamento por taxa.`,
    link: "https://upstat.online",
    art: "upstat",
    tags: ["Node.js", "React", "PostgreSQL", "Go", "Flutter"],
    status: { label: "Em produção", color: "#22c55e" },
  },
  {
    slug: "pingoo",
    title: "Pingoo",
    subtitle: "Mensageria WhatsApp",
    description: `Plataforma de mensageria WhatsApp construída em React + Java Spring Boot.

Interface glassmorphism com módulos de Templates, Integrações, Relatórios e Configurações, pensada para gerenciar campanhas e fluxos de atendimento em escala.

Stack: React, TypeScript, Tailwind CSS, Java Spring Boot, WhatsApp API.`,
    link: "https://github.com/yagofontanez/pingoo-backend",
    art: "pingoo",
    tags: ["React", "TypeScript", "Spring Boot", "Tailwind"],
    status: { label: "Open Source", color: "#818cf8" },
  },
  {
    slug: "martins",
    title: "Martins Adviser",
    subtitle: "CRM Multicanal",
    description: `CRM completo para gestão e automação de mensagens multicanal — e-mail, WhatsApp e SMS.

Frontend em React, backend em Laravel + Node.js, rodando em AWS + Contabo + Railway. Integrações com Twilio e Evolution API para programação e envio automatizado de campanhas.`,
    link: "https://martinsadviser.com/",
    art: "martins",
    tags: ["React", "Laravel", "Node.js", "AWS", "Twilio"],
    status: { label: "Live", color: "#0ea5e9" },
  },
  {
    slug: "tcc",
    title: "TCC · Benchmarking de Backends",
    subtitle: "Pesquisa Acadêmica · ITE Bauru",
    description: `Trabalho de Conclusão de Curso aprovado com nota máxima na defesa.

Pesquisa comparativa de performance entre Node.js, FastAPI e Laravel aplicados a mensageria automatizada via Twilio. Coleta de métricas de latência, throughput e uso de recursos em cenários controlados.

Resultado: Laravel liderou com 0,561s de latência média, seguido por Node.js e FastAPI — análise completa, metodologia reprodutível e repositório público para consulta acadêmica.`,
    link: "https://repositorios-tcc.netlify.app/",
    art: "tcc",
    tags: ["Node.js", "FastAPI", "Laravel", "Twilio"],
    status: { label: "★ Nota máxima", color: "#fbbf24" },
  },
];

export const findProjectBySlug = (slug: string): ProjectFull | undefined =>
  PROJECTS.find((p) => p.slug === slug.toLowerCase());
