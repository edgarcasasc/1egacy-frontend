// check-models.js
const apiKey = "TU_API_KEY_AQUI_PEGALA_DIRECTO"; 
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function check() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Modelos disponibles para ti:");
    if (data.models) {
        data.models.forEach(m => {
            if (m.supportedGenerationMethods.includes("generateContent")) {
                console.log("✅ " + m.name.replace("models/", ""));
            }
        });
    } else {
        console.log("❌ Error:", data);
    }
  } catch (error) {
    console.error(error);
  }
}

check();