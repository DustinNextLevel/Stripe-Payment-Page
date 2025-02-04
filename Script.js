
const stripe = Stripe("pk_live_51MMyNODYnRX0Qs7zQuAjgwrTLASGqAAOkuDiBLOqwdBfmxPbg74CW7lRXHBLXTb8zRO6PDDhMP3RlhDQV38WcFHG009HI3Hriz"); // Replace with your Stripe Publishable Key

document.addEventListener("DOMContentLoaded", async () => {
    const { clientSecret } = await fetch("YOUR_BACKEND_URL/create-payment-intent", { method: "POST" })
        .then(res => res.json());

    const elements = stripe.elements();
    const paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

    const form = document.getElementById("payment-form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: "https://yourusername.github.io/success.html" }
        });

        if (error) {
            document.getElementById("error-message").textContent = error.message;
        }
    });
});
