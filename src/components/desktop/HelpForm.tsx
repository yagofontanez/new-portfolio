import { useState } from "react";
import type { FormEvent } from "react";
import { FaPaperPlane, FaRegEnvelopeOpen } from "react-icons/fa";

const HelpForm = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mailto = `mailto:dev.yagofontanez@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(
      `${message}\n\n— Enviado por ${from}`,
    )}`;
    window.location.href = mailto;
  };

  const canSubmit = from.trim() && subject.trim() && message.trim();

  return (
    <form className="helpform" onSubmit={handleSubmit}>
      <header className="helpform-head">
        <div className="helpform-head-icon">
          <FaRegEnvelopeOpen />
        </div>
        <div className="helpform-head-text">
          <h1>Nova mensagem</h1>
          <p>Me mande um e-mail — respondo em até 24h.</p>
        </div>
      </header>

      <div className="helpform-fields">
        <div className="helpform-field readonly">
          <label>Para</label>
          <span className="helpform-readonly">dev.yagofontanez@gmail.com</span>
        </div>

        <div className="helpform-field">
          <label htmlFor="hf-from">De</label>
          <input
            id="hf-from"
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="seuemail@exemplo.com"
            required
            autoComplete="email"
          />
        </div>

        <div className="helpform-field">
          <label htmlFor="hf-subject">Assunto</label>
          <input
            id="hf-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sobre o que você quer falar?"
            required
          />
        </div>

        <div className="helpform-field textarea">
          <label htmlFor="hf-message">Mensagem</label>
          <textarea
            id="hf-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escreva sua mensagem…"
            rows={6}
            required
          />
        </div>
      </div>

      <footer className="helpform-foot">
        <span className="helpform-hint">
          O envio abre seu app de e-mail padrão.
        </span>
        <button
          type="submit"
          className="helpform-submit"
          disabled={!canSubmit}
        >
          <FaPaperPlane />
          Enviar
        </button>
      </footer>
    </form>
  );
};

export default HelpForm;
