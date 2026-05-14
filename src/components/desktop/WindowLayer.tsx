import { useWindows } from "../../state/windows/WindowsContext";
import NotesApp from "./NotesApp";
import ProjectApp from "./ProjectApp";
import SafariApp from "./SafariApp";
import TerminalApp from "./TerminalApp";
import WindowFrame from "./WindowFrame";

const WindowLayer = () => {
  const { windows, openNotes } = useWindows();

  return (
    <>
      {windows.map((win) => {
        if (win.payload.type === "notes") {
          return (
            <WindowFrame key={win.id} window={win} headerVariant="notes">
              <NotesApp
                selectedNote={win.payload.data.selectedNote}
                onSelectNote={(title) => openNotes({ selectedNote: title })}
              />
            </WindowFrame>
          );
        }
        if (win.payload.type === "terminal") {
          return (
            <WindowFrame key={win.id} window={win} headerVariant="terminal">
              <TerminalApp />
            </WindowFrame>
          );
        }
        if (win.payload.type === "safari") {
          return (
            <WindowFrame key={win.id} window={win}>
              <SafariApp payload={win.payload.data} />
            </WindowFrame>
          );
        }
        return (
          <WindowFrame key={win.id} window={win}>
            <div className="window-scroll-pad">
              <ProjectApp project={win.payload.data} />
            </div>
          </WindowFrame>
        );
      })}
    </>
  );
};

export default WindowLayer;
