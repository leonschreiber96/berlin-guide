function createCard(poi) {
   const card = document.createElement("div");
   card.className = "card";
   card.innerHTML = `
      <h3 class="title-3">${poi.name}</h3>
      <h4 class="subtitle-2">${poi.category}</h4>
      <img src="images/${poi.image}" alt="${poi.name}" />
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
   return card;
}

fetch("/data")
   .then((response) => response.json())
   .then((data) => {
      data.forEach((poi) => {
         const card = createCard(poi);
         card.className = "card poi-card";
         document.getElementById("card-container").appendChild(card);
      });
   });
