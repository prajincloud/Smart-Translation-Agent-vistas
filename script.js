async function translateText() {
  const text = document.getElementById("inputText").value;
  const target = document.getElementById("language").value;
  const output = document.getElementById("output");
  const error = document.getElementById("error");

  output.innerText = "";
  error.innerText = "";

  if (text.trim() === "") {
    error.innerText = "Please enter some text";
    return;
  }

  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: target,
        format: "text"
      })
    });

    const data = await response.json();

    if (data.error) {
      error.innerText = "Translation service error";
    } else {
      output.innerText = data.translatedText;
    }

  } catch (err) {
    error.innerText = "Server unavailable. Try again later.";
  }
}