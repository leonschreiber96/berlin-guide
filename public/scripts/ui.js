function createCard(poi) {
   const card = document.createElement("div");
   card.className = "card";
   card.innerHTML = `
      <h3 class="title-3">${poi.name}</h3>
      <h4 class="subtitle-2">${poi.category}</h4>
      <img src="assets/images/${poi.image}" alt="${poi.name}" />
      <p>${poi.note.length > 250 ? `${poi.note.slice(0, 250)}...` : poi.note}</p>
      ${poi.note.length > 250 ? `<a href="/poi/${poi.id}" style="margin-top:-15px">Read more</a>` : ""}
      <div style="display: flex; flex-wrap: wrap;">
         ${
            poi.tags
               ? poi.tags
                    .sort()
                    .map((tag) => `<span class="badge badge-outline">${tag}</span>`)
                    .join("")
               : ""
         }
      </div>
   `;
   // <div class="transport-durations" style="position:absolute;right:1em;top:.5em;">
   //       <span style="display:flex">
   //          <div class="transport-icon car-icon"></div>
   //          --
   //       </span>
   //       <span  style="display:flex">
   //          <div class="transport-icon bike-icon"></div>
   //          --
   //       </span>
   //       <span style="display:flex">
   //          <div class="transport-icon walk-icon"></div>
   //          --
   //       </span>
   //    </div>
   return card;
}

function createPoiCards(data) {
   data.forEach((poi) => {
      const card = createCard(poi);
      card.className = "card poi-card";
      document.getElementById("card-container").appendChild(card);
   });
}

/* Code for the switch that toggles between light and dark mode */ 
function initDarkModeToggle() {
   const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
   const currentTheme = localStorage.getItem("theme");

   if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
         toggleSwitch.checked = true;
         document.getElementById("map").classList.add("dark");
      }
   }

   function switchTheme(e) {
      if (e.target.checked) {
         document.documentElement.setAttribute("data-theme", "dark");
         localStorage.setItem("theme", "dark");
         document.getElementById("map").classList.add("dark");
      } else {
         document.documentElement.setAttribute("data-theme", "light");
         localStorage.setItem("theme", "light");
         document.getElementById("map").classList.remove("dark");
      }
   }

   toggleSwitch.addEventListener("change", switchTheme, false);
}

function toggleSideMenu() {
   document.querySelector("aside").classList.toggle("open");
   document.querySelector("main").classList.toggle("aside-open");
   document.querySelector("header").classList.toggle("aside-open");
}

const headerHeight = document.querySelector("header").getBoundingClientRect().height;
document.querySelector("main").style.marginTop = `${headerHeight}px`;