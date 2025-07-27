export const homeTemplate = `
<template>
  <img src="../public/banner.webp" alt="main_banner" class="main_banner" />
  <section class="property2">
    <img src="../public/cards_img/plane.png" alt="image_of_plane" width="310" height="338" />
    <div class="property2-content">
      <h2>HERE TO TAKE YOU TO A DESTINATION</h2>
      <h1>Fly Away with the best airlines</h1>
      <p>
        Lorem ipsum enim est malesuada faucibus odio risus placerat orci tellus cras aliquam
        convallis duis sit curabitur porttitor quam sed.
      </p>
      <button class="button" id="emptyFormButton">Book Now</button>
    </div>
  </section>
  <section class="property3">
    <h1>Why People Like To Fly With Us</h1>
    <div>
      <div class="arg">
        <h1>Explore new cities</h1>
        <img
          src="../public/cards_img/Frame 41.png"
          alt="frame-41"
          width="266.5"
          height="322.4"
          class="arg-image"
        />
      </div>
      <div class="arg">
        <h1>Confortable seating</h1>
        <img
          src="../public/cards_img/Frame 43.png"
          alt="frame-43"
          width="266.5"
          height="322.4"
          class="arg-image"
        />
      </div>
      <div class="arg">
        <h1>Always on time</h1>
        <img
          src="../public/cards_img/Frame 44.png"
          alt="frame-44"
          width="266.5"
          height="322.4"
          class="arg-image"
        />
      </div>
    </div>
  </section>
  <section class="property4">
    <h1>Discover Deals For This Month</h1>
    <div>
      <div class="deal">
        <div class="deal-infos">
          <div>
            <span class="bold">Paris - Lisbon</span>
            <div><span class="bold">45$ /</span> <span>person</span></div>
          </div>
          <div>
            <span>26 - 31</span>
          </div>
        </div>
        <img
          src="../public/cards_img/Group 22.png"
          alt="group-22"
          width="381"
          height="282"
          class="deals-img"
          id="parisLisbon"
        />
      </div>
      <div class="deal">
        <div class="deal-infos">
          <div>
            <span class="bold">Paris - Rome</span>
            <div><span class="bold">45$ /</span> <span>person</span></div>
          </div>
          <div>
            <span>26 - 31</span>
          </div>
        </div>
        <img
          src="../public/cards_img/Group 20.png"
          alt="group-22"
          width="381"
          height="282"
          class="deals-img"
          id="parisRome"
        />
      </div>
      <div class="deal">
        <div class="deal-infos">
          <div>
            <span class="bold">Paris - Amsterdam</span>
            <div><span class="bold">45$ /</span> <span>person</span></div>
          </div>
          <div>
            <span>26 - 31</span>
          </div>
        </div>
        <img
          src="../public/cards_img/Group 24.png"
          alt="group-24"
          width="381"
          height="282"
          class="deals-img"
          id="parisAmsterdam"
        />
      </div>
    </div>
  </section>
  <section class="property5">
    <h1>Testimonials</h1>
    <div class="testimonial">
      <img src="../public/cards_img/Rectangle 29.png" alt="img-of-natalie-portman" />
      <div>
        <p>
          "From the check-in to the landing, every moment felt effortless. The crew was charming,
          the cabin was spotless, and I even arrived early. I’ve flown with many airlines — this one
          truly raised the bar !"
        </p>
        <span>Natalie Portman, Actress</span>
      </div>
    </div>
    <div class="testimonial left">
      <div>
        <p>
          "Honestly? I expected turbulence, delays, and a bland meal. What I got instead was
          seamless booking, a smooth ride, and shockingly good coffee. Fly Away is officially my
          go-to for stress-free travel."
        </p>
        <span>Andy Murray, Tennis Player</span>
      </div>
      <img src="../public/cards_img/Rectangle 31.png" alt="img-of-Andy-murray" />
    </div>
  </section>
  <section class="property6">
    <span>“</span>
    <p>At Fly Away, the sky isn’t the limit <br />— it’s your private lounge.</p>
    <span>”</span>
  </section>
</template>
`;
export default homeTemplate;
