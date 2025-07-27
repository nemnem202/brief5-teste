const paymentTemplate = `
<template>
  <link rel="stylesheet" href="./src/componentsStyleSheets/paymentStyle.css">
  <div class="payment-main">
    <section class="payment-section">
      <h2 class="payment-title">
        Before proceeding to pay, please verify your travel itinary:
      </h2>
      <div class="payment-checking-content">
        <div>
          <div class="payment-reservation-infos">
            <div id="clientInfos" class="payment-client"></div>
            <div id="travelInfos" class="payment-flight"></div>
          </div>
          <div id="price" class="payment-price"></div>
        </div>
        <p>
          Lorem ipsum enim est malesuada faucibus odio risus placerat orci tellus
          cras aliquam convallis duis sit curabitur porttitor quam sed egestas
          amet nullam nisl sollicitudin ut duis netus enim varius duis faucibus
          facilisis et semper.
        </p>
        <div class="payment-checking">
          <button id="returnToForm" class="payment-return-btn">Edit Personal Details</button>
          <div>
            <div class="payment-consent">
              <input type="checkbox" name="consent" id="consent" />
              <label for="consent">I accept the Terms & Conditions</label>
            </div>
            <p id="consentError" class="error-message"></p>
          </div>
        </div>
      </div>
    </section>
    <section class="payment-section">
      <h2 class="payment-title">Add your card details </h2>
      <form class="payment-form" id="paymentForm">
        <div class="payment-info">
          <label for="cardName">Full Name *</label>
          <input
            type="text"
            name="cardName"
            id="cardName"
            placeholder="John Doe"
            required
          />
          <p id="cardNameError" class="error-message"></p>
        </div>
        <div class="payment-info">
          <label for="cardNumber">Card Number *</label>
          <input
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            required
          />
          <p id="cardNumberError" class="error-message"></p>
        </div>
        <div class="payment-info-line">
          <div class="payment-info">
            <label for="cardExpiry">Expiration Date *</label>
            <input
              type="text"
              name="cardExpiry"
              id="cardExpiry"
              placeholder="MM/YYYY"
              required
            />
            <p id="cardExpiryError" class="error-message"></p>
          </div>
          <div class="payment-info">
            <label for="cardCvv">CVV *</label>
            <input type="text" name="cardCVV" id="cardCvv" required />
            <p id="cardCvvError" class="error-message"></p>
          </div>
        </div>
        <button class="button" type="submit" id="payBtn">
          Pay for the travel
        </button>
      </form>
    </section>
  </div>
</template>
`;

export default paymentTemplate;
