"use strict";
/* JavaScript 7th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: Atsede Degife
    Date:   April 3, 2026

    Filename: js10a.js
*/

window.addEventListener("load", setupRoom);

function setupRoom() {
   let room = document.getElementById("room");
   let storage = document.getElementById("storage");
   let roomTables = document.querySelectorAll("#room > div.table");
   let storageTables = document.querySelectorAll("#storage > div.table");
   let zIndexCounter = 0;

   // Clone tables from storage to room
   for (let i = 0; i < storageTables.length; i++) {
      storageTables[i].onclick = function() {
         let newTable = this.cloneNode(true);
         newTable.style.position = "absolute";
         newTable.style.left = "0px";
         newTable.style.top = "0px";
         
         zIndexCounter++;
         newTable.style.zIndex = zIndexCounter;
         room.appendChild(newTable);
         
         countSeats();
         // Attach drag event to the new clone
         newTable.onpointerdown = grabTable;
      };
   }

   function grabTable(e) {
      if (e.shiftKey) {
         this.parentElement.removeChild(this);
         countSeats();
      } else {
         let moveX = e.clientX;
         let moveY = e.clientY;
         let table = e.target;
         table.style.touchAction = "none";
         zIndexCounter++;
         table.style.zIndex = zIndexCounter;

         table.onpointermove = function(e) {
            let diffX = e.clientX - moveX;
            let diffY = e.clientY - moveY;
            table.style.left = table.offsetLeft + diffX + "px";
            table.style.top = table.offsetTop + diffY + "px";
            moveX = e.clientX;
            moveY = e.clientY;
         };

         table.onpointerup = function() {
            table.onpointermove = null;
            table.onpointerup = null;
         };
      }
   }

   function countSeats() {
      let guests = 0;
      let seatCount = document.getElementById("seatCount");
      let tablesToCount = document.querySelectorAll("#room > div.table");
      for (let items of tablesToCount) {
         guests += parseInt(items.textContent) || 0;
      }
      if (seatCount) {
         seatCount.textContent = guests;
      }
   }
}
