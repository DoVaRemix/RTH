// Initialize Stripe with your live publishable key
const stripe = Stripe("pk_live_51SWBwY2MKUlb0firBvAE8oCNtcRLCrQWFkMsaSHbbrzT8HlzkUfzD60cY2punYX83sEl9AgoZCkcRsq7H07eY2UH00DpEGyjus");

const checkoutBtn = document.getElementById('checkoutBtn');

checkoutBtn.addEventListener('click', async () => {
    const crystalShape = document.getElementById('crystalShape').value;
    const engraving = document.getElementById('engraving').checked;
    const giftWrap = document.getElementById('giftWrap').checked;

    const orderData = { crystalShape, engraving, giftWrap };

    // Call backend to create a Stripe Checkout session
    const response = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
    });


    const session = await response.json();
    if(session.id){
        // Redirect to Stripe Checkout
        stripe.redirectToCheckout({ sessionId: session.id });
    } else {
        alert('Error creating checkout session.');
    }
});

