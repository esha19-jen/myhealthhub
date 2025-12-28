function showSection(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

/* DASHBOARD 1 */
function savePatient() {
  const data = {
    name: patientName.value,
    age: patientAge.value,
    condition: patientCondition.value
  };

  localStorage.setItem("patientData", JSON.stringify(data));
  patientOutput.innerText =
    `Saved: ${data.name}, Age ${data.age}, Condition: ${data.condition}`;
}

/* DASHBOARD 2 */
function setReminder() {
  alert(
    "Reminder set for " +
    medicineName.value +
    " at " +
    medicineTime.value
  );
}

/* DASHBOARD 3 – AI (Basic) */
function aiChat() {
  let q = aiQuestion.value.toLowerCase();
  let answer = "Please consult your doctor.";

  if (q.includes("fever")) answer = "Give rest, fluids, and monitor temperature.";
  if (q.includes("medicine")) answer = "Ensure medicine is taken on time.";

  aiAnswer.innerText = answer;
}
