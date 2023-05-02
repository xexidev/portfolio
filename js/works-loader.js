// Works Loader

fetch("work.json")
.then((r) => {
    r.json().then((works) => {
        
      let fragment = new DocumentFragment();

      // Gráfico
      works.grafico.forEach((item) => {
        let work = document.createElement("a");
        work.setAttribute("data-id", item.id);
        work.classList.add("work-item");
        work.classList.add("work-item-diseno");
        if (item.hasOwnProperty("url")) {
          work.setAttribute("href", item.url);
        }
        work.innerHTML = `            
                  <div class="work-image" style="background-image:url('${item.image}')"></div>
                  <template data-modalid="${item.id}">
                      <div class="work-modal">
                          <div class="work-modal-image">
                              <img src="${item.image}" alt="${item.name}">
                          </div>
                          <div class="work-modal-info">
                              <div class="work-modal-title">
                                      ${item.name}
                              </div>
                              <div class="work-modal-text">
                                  ${item.description}
                              </div>
                          </div>
                      </div>
                  </template>
              `;
        fragment.appendChild(work);
        work.addEventListener("click", (e) => {
          e.preventDefault();
          renderModal(work.querySelector("[data-modalid=" + item.id + "]"));
        });
      });
      document
        .getElementsByClassName("work-showcase-grafico")[0]
        .appendChild(fragment);

      // Web
      works.web.forEach((item) => {
        let work = document.createElement("a");
        work.classList.add("work-item");
        work.classList.add("work-item-web");
        if (item.hasOwnProperty("url")) {
          work.setAttribute("href", item.url);
          work.setAttribute("target", "_blank");
        }
        work.innerHTML = `            
                  <div class="work-image" style="background-image:url('${item.image}')"></div>
              `;
        fragment.appendChild(work);
      });
      document
        .getElementsByClassName("work-showcase-web")[0]
        .appendChild(fragment);

      // Dev
      works.dev.forEach((item) => {
        let work = document.createElement("a");
        work.setAttribute("data-id", item.id);
        work.classList.add("work-item");
        work.classList.add("work-item-dev");
        if (item.hasOwnProperty("url")) {
          work.setAttribute("href", item.url);
        }
        work.innerHTML = `            
                  <div class="work-image" style="background-image:url('${item.image}')"></div>
                  <template data-modalid="${item.id}">
                      <div class="work-modal">
                          <div class="work-modal-image">
                              <img src="${item.image}" alt="${item.name}">
                          </div>
                          <div class="work-modal-info">
                              <div class="work-modal-title">
                                      ${item.name}
                              </div>
                              <div class="work-modal-text">
                                  ${item.description}
                              </div>
                          </div>
                      </div>
                  </template>
              `;
        fragment.appendChild(work);
        work.addEventListener("click", (e) => {
          e.preventDefault();
          renderModal(work.querySelector("[data-modalid=" + item.id + "]"));
        });
      });
      document
        .getElementsByClassName("work-showcase-dev")[0]
        .appendChild(fragment);
    });
  },
  (error) => {
    console.log(error);
  }
);