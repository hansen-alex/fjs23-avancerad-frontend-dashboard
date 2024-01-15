import axios from "axios";

const linkLlist = document.querySelector(".quick-links-list");
const addQuickLinkButton = document.querySelector(".add-quick-link-button");

const quickLinksStorage = [
  {
    id: 1,
    title: "Google",
    url: "www.google.com",
  },
  {
    id: 2,
    title: "LinkedIn",
    url: "www.linkedin.com",
  },
  {
    id: 3,
    title: "Youtube",
    url: "www.youtube.com",
  },
  {
    id: 4,
    title: "Netflix",
    url: "www.netflix.com",
  },
];

const addQuickLink = () => {
  //id time.now
};
addQuickLinkButton.addEventListener("click", addQuickLink);

const removeQuickLink = () => {};

const moveQuickLink = () => {};

const loadQuickLinks = () => {
  //load from local storage
  //quickLinksStorage ^^^

  linkLlist.innerHTML = `
  ${quickLinksStorage
    .map((quickLink) => {
      return `
    <div class="quick-link" data-quick-link-id="${quickLink.id}">
        <div class="quick-link-favicon-title-wrapper">
            <img
                src="https://s2.googleusercontent.com/s2/favicons?domain_url=${quickLink.url}"
                alt="${quickLink.title} icon"
                class="quick-link-favicon"
            />
            <h3 class="quick-link-title">${quickLink.title}</h3>
        </div>
        <div class="quick-link-controls">
            <button
                class="remove-quick-link-button"
                type="button"
                title="Remove quick link"
            >
                <i class="material-symbols-outlined"> do_not_disturb_on </i>
            </button>
            <div class="move-quick-link-controls">
                <button
                    class="move-quick-link-up-button"
                    type="button"
                    title="Move quick link up"
                >
                    <i class="material-symbols-outlined"> arrow_drop_up </i>
                </button>
                <button
                    class="move-quick-link-down-button"
                    type="button"
                    title="Move quick link down"
                >
                    <i class="material-symbols-outlined"> arrow_drop_down </i>
                </button>
            </div>
        </div>
    </div>
    `;
    })
    .join("")}
  `;
};

loadQuickLinks();
