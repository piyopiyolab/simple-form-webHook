document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());


        //Valid patern for phone number
        const phonePattern = /^\+[1-9]\d{1,14}$/;
        if (!phonePattern.test(data.phone)) {
            alert("Veuillez entrer un numéro de téléphone valide au format international.");
            return;
        }


        //Timestamp
        data.timestamp = new Date().toISOString();

        fetch("https://piyopiyo.app.n8n.cloud/webhook-test/9458f2ef-1679-4f81-a1b8-c3e7f69b0406", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            alert("Message envoyé avec succès !");
            form.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Erreur lors de l'envoi du message.");
        });
    });
});
