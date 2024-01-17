const notesTextArea = document.querySelector("#notes-text-area");

const loadQuickNote = () => {
  notesTextArea.value = JSON.parse(localStorage.getItem("quickNote")) || "";
};

const updateQuickNote = () => {
  localStorage.setItem("quickNote", JSON.stringify(notesTextArea.value));
};
notesTextArea.addEventListener("input", updateQuickNote);

loadQuickNote();
