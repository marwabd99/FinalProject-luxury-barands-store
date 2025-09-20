import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setFontSize,
  toggleDarkMode,
  toggleAccessibleFont,
  toggleReduceMotion,
  setSpeaking,
  resetAccessibility,
} from "../../Redux/slices/accessibilitySlice";
import "./AccessibilityWidget.css";

const AccessibilityWidget = () => {
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const utteranceRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Redux state
  const { darkMode, fontSize, accessibleFont, reduceMotion, isSpeaking } =
    useSelector((state) => state.accessibility);

  // אפקטים לשמירה ב-localStorage ולשינוי סגנון הדף
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize = fontSize + "px";
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("accessibleFont", accessibleFont);
    document.body.classList.toggle("accessible-font", accessibleFont);
  }, [accessibleFont]);

  useEffect(() => {
    localStorage.setItem("reduceMotion", reduceMotion);
    document.body.classList.toggle("reduce-motion", reduceMotion);
  }, [reduceMotion]);

  useEffect(() => {
    if (!open && isSpeaking) stopSpeaking();
  }, [open]);

  // פונקציות קריינות
  const startSpeaking = () => {
    if (!("speechSynthesis" in window))
      return alert("דפדפן זה לא תומך בקריינות");
    if (utteranceRef.current) speechSynthesis.cancel();

    const text = panelRef.current
      ? panelRef.current.innerText
      : "אפשרויות נגישות";
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "he-IL";
    utterance.onend = () => dispatch(setSpeaking(false));

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    dispatch(setSpeaking(true));
  };

  const stopSpeaking = () => {
    if (utteranceRef.current) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      dispatch(setSpeaking(false));
    }
  };

  const toggleSpeaking = () => (isSpeaking ? stopSpeaking() : startSpeaking());

  const handleReset = () => {
    dispatch(resetAccessibility());
    stopSpeaking();
    localStorage.clear();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="accessibility-button"
        aria-label="תפריט נגישות"
      >
        ♿
      </button>

      {open && (
        <div
          className="accessibility-panel"
          role="region"
          aria-label="אפשרויות נגישות"
          ref={panelRef}
          tabIndex={0}
        >
          <div className="accessibility-section">
            <label>גודל טקסט:</label>
            <div>
              <button
                onClick={() =>
                  dispatch(setFontSize(Math.max(12, fontSize - 2)))
                }
              >
                -
              </button>
              <span>{fontSize}px</span>
              <button
                onClick={() =>
                  dispatch(setFontSize(Math.min(30, fontSize + 2)))
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="accessibility-section">
            <label>מצב כהה</label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => dispatch(toggleDarkMode())}
            />
          </div>

          <div className="accessibility-section">
            <label>גופן נגיש</label>
            <input
              type="checkbox"
              checked={accessibleFont}
              onChange={() => dispatch(toggleAccessibleFont())}
            />
          </div>

          <div className="accessibility-section">
            <label>עצירת אנימציות</label>
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={() => dispatch(toggleReduceMotion())}
            />
          </div>

          <div className="accessibility-section">
            <button onClick={toggleSpeaking}>
              {isSpeaking ? "■ עצור קריינות" : "▶ הפעל קריינות"}
            </button>
          </div>

          <div className="accessibility-section">
            <button onClick={handleReset}>איפוס הגדרות נגישות</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
