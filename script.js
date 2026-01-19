async function translateText() {
  const text = document.getElementById("inputText").value;
  const target = document.getElementById("language").value;
  const output = document.getElementById("output");
  const error = document.getElementById("error");

  output.innerText = "";
  error.innerText = "";

  if (!text.trim()) {
    error.innerText = "Please enter some text";
    return;
  }

  const servers = [
    "https://libretranslate.de/translate",
    "https://translate.argosopentech.com/translate"
  ];

  for (let server of servers) {
    try {
      const response = await fetch(server, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: target,
          format: "text"
        })
      });

      if (!response.ok) continue;

      const data = await response.json();
      output.innerText = data.translatedText;
      return;

    } catch (e) {
      // try next server
    }
  }

  error.innerText = "Translation service temporarily unavailable. Try again later.";
}
