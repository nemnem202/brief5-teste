const formTemplate = `<template>
    <main>


      <h2>Book Your Ticket</h2>
      

      <form class="booking-form" id= "reservation-form">
      <div id="errors"></div>
      <h3>Add your details*</h3>
  
      <div class="name-row">
       <div class="input-group">
       <label for="firstName">First Name</label>
       <input type="text" id="firstName" name="firstName" placeholder="First Name" class="firstNameInput" required>
       </div>
       <div class="input-group">
       <label for="lastName">Last Name</label>
       <input type="text" id="lastName" name="lastName" placeholder="Last Name" required>
       </div>
      </div>
  
      <div class="contact-row">
       <div class="input-group">
       <label for="contact">Contact Details</label>
       <input type="number" id="contact" name="contact" placeholder="+33 07 12 34 56 78" required>
       </div>
       <div class="input-group">
       <label for="email">Email Address</label>
       <input type="email" id="email" name="email" placeholder="email" required>
       </div>
      </div>

      <h3>Choose your destination*</h3>
  
      <div class="destination-row">
       <div class="input-group">
       <label for="from">From</label>
       <input type="text" id="from" name="from" value="Paris" readonly>
       </input>
       </div>
    
       <div class="input-group">
       <label for="to">To</label>
       <select id="to" name="to" required>
          <option value="">Select Destination</option>
       </select>
       </div>
      </div>
  
      <div class="date-row">
       <div class="input-group">
       <label for="start">Travel Start Date</label>
       <input type="date" id="startDate" name="startDate" required>
       </div>
        <div class="input-group">
       <label for="time">Time Of Departure</label>
       <input type="time" id="startTime" name="startDate" required>
       </div>
      </div>


    <h3>Choose Your Travelling Class*</h3>
    <div class="threeboxes">
    
    <div class = box>
      <div class="boxcontent">
      <p>-Standard seating<br>-No meals</p>
      </div>
      <div class="bottom"><span class="price" id="price-economy">Price: 120€</span>
      <button class="buttongreen class-btn" type="button"> Economy </button>
      </div>
    </div>


    <div class = box>
      <div class="boxcontent">
      <p>-Seating with legroom<br>-Meals included <br> -Lounge Access</p>
      </div>
      <div class="bottom"><span class="price" id="price-business">Price: 320€</span>
      <button class="buttongreen class-btn" type="button"> Business </button>
      </div>
    </div>


    <div class = box>
      <div class="boxcontent">
      <p>-Premium Seating<br>-Premium Service <br>-Champagne<br> -Personal Chauffeur</p>
      </div>
      <div class="bottom"><span class="price" id="price-firstClass">Price: 540€</span>
      <button class="buttongreen class-btn" type="button"> First Class </button>  
      </div>
    </div>
    </div>
    <h3 id="final-price-box">The price for the travel will be: <span id="finalPrice"></span></h3> 
    <button type="submit" class="final-btn" id="proceedBtn">Proceed to payment</button>
  </form>

    </main>
</template>`;

export default formTemplate;
