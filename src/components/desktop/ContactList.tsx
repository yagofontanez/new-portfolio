import { useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaLinkedinIn,
  FaGithub,
  FaGlobe,
  FaRegFilePdf,
  FaRegCopy,
  FaCheck,
} from "react-icons/fa";
import type { ReactNode } from "react";

interface Channel {
  id: string;
  label: string;
  value: string;
  href: string;
  copyText?: string;
  icon: ReactNode;
  bg: string;
  download?: boolean;
}

const CHANNELS: Channel[] = [
  {
    id: "email",
    label: "E-mail",
    value: "dev.yagofontanez@gmail.com",
    href: "mailto:dev.yagofontanez@gmail.com",
    copyText: "dev.yagofontanez@gmail.com",
    icon: <FaEnvelope />,
    bg: "linear-gradient(135deg, #4facfe 0%, #1e7ce8 100%)",
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+55 14 98225-8397",
    href: "https://wa.me/5514982258397",
    copyText: "+5514982258397",
    icon: <FaWhatsapp />,
    bg: "linear-gradient(135deg, #4ade80 0%, #16a34a 100%)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/in/yagofontanez",
    href: "https://www.linkedin.com/in/yagofontanez",
    copyText: "https://linkedin.com/in/yagofontanez",
    icon: <FaLinkedinIn />,
    bg: "linear-gradient(135deg, #2196f3 0%, #0a66c2 100%)",
  },
  {
    id: "github",
    label: "GitHub",
    value: "@yagofontanez",
    href: "https://github.com/yagofontanez",
    copyText: "https://github.com/yagofontanez",
    icon: <FaGithub />,
    bg: "linear-gradient(135deg, #4a4a4a 0%, #1d1d1f 100%)",
  },
  {
    id: "site",
    label: "Site pessoal",
    value: "yagof-dev.netlify.app",
    href: "https://yagof-dev.netlify.app",
    copyText: "https://yagof-dev.netlify.app",
    icon: <FaGlobe />,
    bg: "linear-gradient(135deg, #a78bfa 0%, #6d28d9 100%)",
  },
  {
    id: "cv",
    label: "Currículo (PDF)",
    value: "Baixar · 2026",
    href: "/assets/Curriculo Yago 2026 Att.pdf",
    icon: <FaRegFilePdf />,
    bg: "linear-gradient(135deg, #fb7185 0%, #d93025 100%)",
    download: true,
  },
];

const ContactList = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
    } catch {
      /* clipboard indisponível — ignora */
    }
  };

  return (
    <div className="contact">
      <header className="contact-hero">
        <div className="contact-hero-avatar">
          <img src="/assets/yago.jpg" alt="" />
        </div>
        <div className="contact-hero-text">
          <h1>Yago Henrique Fontanez</h1>
          <span className="contact-hero-role">
            Dev Fullstack · Bauru, SP
          </span>
          <span className="contact-hero-badge">
            <span className="contact-hero-dot" />
            Aberto a oportunidades
          </span>
        </div>
      </header>

      <p className="contact-intro">
        Me chame por qualquer canal abaixo — respondo em até 24h.
      </p>

      <ul className="contact-list">
        {CHANNELS.map((c) => {
          const copied = copiedId === c.id;
          return (
            <li key={c.id} className="contact-row">
              <a
                href={c.href}
                target={c.download ? "_blank" : "_self"}
                rel="noopener noreferrer"
                download={c.download || undefined}
                className="contact-row-link"
              >
                <span className="contact-row-icon" style={{ background: c.bg }}>
                  {c.icon}
                </span>
                <span className="contact-row-text">
                  <span className="contact-row-label">{c.label}</span>
                  <span className="contact-row-value">{c.value}</span>
                </span>
              </a>
              {c.copyText && (
                <button
                  type="button"
                  className={`contact-copy${copied ? " is-copied" : ""}`}
                  onClick={() => copy(c.id, c.copyText!)}
                  aria-label={`Copiar ${c.label}`}
                >
                  {copied ? <FaCheck /> : <FaRegCopy />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
