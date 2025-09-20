import { createSlice } from "@reduxjs/toolkit";

// מצב התחלתי של slice הנגישות
const initialState = {
  darkMode: false, // מצב כהה (false = לא פעיל)
  fontSize: 16, // גודל פונט ברירת מחדל
  accessibleFont: false, // האם להשתמש בגופן נגיש
  reduceMotion: false, // האם להפחית אנימציות ותנועות
  isSpeaking: false, // האם הפיצ'ר של דיבור פעיל
};

// יצירת slice בשם "accessibility"
const accessibilitySlice = createSlice({
  name: "accessibility", // שם ה-slice
  initialState, // המצב ההתחלתי
  reducers: {
    // פונקציות שמעדכנות את ה-state
    // שינוי גודל הפונט
    setFontSize: (state, action) => {
      state.fontSize = action.payload; // מקבל ערך חדש מה-action.payload ומעדכן את fontSize
    },

    // הפיכת מצב כהה (toggle)
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode; // משנה את darkMode להפך שלו
    },

    // הפיכת גופן נגיש (toggle)
    toggleAccessibleFont: (state) => {
      state.accessibleFont = !state.accessibleFont;
    },

    // הפחתת תנועות/אנימציות (toggle)
    toggleReduceMotion: (state) => {
      state.reduceMotion = !state.reduceMotion;
    },

    // הפעלת/כיבוי מצב דיבור
    setSpeaking: (state, action) => {
      state.isSpeaking = action.payload; // מקבל true או false מה-action.payload
    },

    // איפוס כל הגדרות הנגישות למצב התחלתי
    resetAccessibility: (state) => {
      state.darkMode = false;
      state.fontSize = 16;
      state.accessibleFont = false;
      state.reduceMotion = false;
      state.isSpeaking = false;
    },
  },
});

// ייצוא כל הפעולות כדי שנוכל להשתמש בהן ברכיבים
export const {
  setFontSize,
  toggleDarkMode,
  toggleAccessibleFont,
  toggleReduceMotion,
  setSpeaking,
  resetAccessibility,
} = accessibilitySlice.actions;

// ייצוא ה-reducer כדי לשלב אותו ב-store הראשי
export default accessibilitySlice.reducer;
