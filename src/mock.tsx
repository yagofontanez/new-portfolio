import ExperienceTimeline from "./components/desktop/ExperienceTimeline";
import AboutMe from "./components/desktop/AboutMe";
import ContactList from "./components/desktop/ContactList";
import HelpForm from "./components/desktop/HelpForm";
import "./styles/desktop/AboutMe.css";
import "./styles/desktop/ContactList.css";
import "./styles/desktop/HelpForm.css";

export const notesData = [
  {
    title: "Experiências",
    content: <ExperienceTimeline />,
  },
  {
    title: "Sobre Mim",
    content: <AboutMe />,
  },
  {
    title: "Contato",
    content: <ContactList />,
  },
  {
    title: "Ajuda",
    content: <HelpForm />,
  },
];
