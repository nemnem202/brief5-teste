const travelCardTemplate = `
<template id="travelCardTemplate">
        <div class="card">
          <div class="left">
            <p><strong>#Booking Number:</strong>    <span id="bookingNumber">???</span> </p>
            <p>From: <span id="originCity">??? </span> &nbsp;&nbsp; To:<span id="destinationCity">???</span>
            </p>
            <p><span id="date"> ???? </span></p>
            <p><span id="standing"> ???? </span></p>
            <p><span id="name"> ???? </span> <span id="lastName"> ???? </span></p>
            <p class="price">Price: <span id="price"> ??? </span> € </p>
          </div>
          <div class="right">
            <p><strong>Services Included:</strong></p>
            <ul id="perks" >
            </ul>
            <p>Contact Details: <span id="email"> ???? </span><br /><span id="phoneNumber"> ???? </span></p>
          </div>
        </div>
</template >`;
export default travelCardTemplate;
