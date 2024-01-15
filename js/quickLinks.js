import axios from "axios";

const linkList = document.querySelector(".quick-links-list");
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
  //get url from user
  //get title from user
  const newQuickLink = {
    id: Date.now(),
    title: "",
    url: "",
  };
  console.log(`add`);
};
addQuickLinkButton.addEventListener("click", addQuickLink);

const removeQuickLink = (event) => {
  event.preventDefault();
  console.log(`remove`);
};

const moveQuickLinkUp = (event) => {
  event.preventDefault();
  console.log(`up`);
};

const moveQuickLinkDown = (event) => {
  event.preventDefault();
  console.log(`down`);
};

const loadQuickLinks = () => {
  //load from local storage
  //quickLinksStorage ^^^
  //need to order links, either with overwriting so top is top or order attribute. do first

  linkList.innerHTML = "";

  quickLinksStorage.forEach((quickLinkData) => {
    const quickLink = document.createElement("a");
    quickLink.classList.add("quick-link");
    quickLink.href = `http://${quickLinkData.url}`;
    quickLink.target = "_blank";
    quickLink.setAttribute("data-quick-link-id", quickLinkData.id);

    const quickLinkFaviconTitleWrapper = document.createElement("div");
    quickLinkFaviconTitleWrapper.classList.add(
      "quick-link-favicon-title-wrapper"
    );

    const quickLinkFavicon = document.createElement("img");
    quickLinkFavicon.classList.add("quick-link-favicon");
    quickLinkFavicon.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${quickLinkData.url}`;
    quickLinkFavicon.alt = `${quickLinkData.title} icon`;
    quickLinkFaviconTitleWrapper.appendChild(quickLinkFavicon);

    const quickLinkTitle = document.createElement("h3");
    quickLinkTitle.classList.add("quick-link-title");
    quickLinkTitle.textContent = `${quickLinkData.title}`;
    quickLinkFaviconTitleWrapper.appendChild(quickLinkTitle);
    quickLink.appendChild(quickLinkFaviconTitleWrapper);

    const quickLinkControls = document.createElement("div");
    quickLinkControls.classList.add("quick-link-controls");

    const removeQuickLinkButton = document.createElement("button");
    removeQuickLinkButton.classList.add("remove-quick-link-button");
    removeQuickLinkButton.type = "button";
    removeQuickLinkButton.title = "Ta bort snabblänk";
    removeQuickLinkButton.addEventListener("click", removeQuickLink);

    const removeQuickLinkButtonIcon = document.createElement("i");
    removeQuickLinkButtonIcon.classList.add("material-symbols-outlined");
    removeQuickLinkButtonIcon.textContent = "do_not_disturb_on";
    removeQuickLinkButton.appendChild(removeQuickLinkButtonIcon);

    quickLinkControls.appendChild(removeQuickLinkButton);

    const moveQuickLinkControls = document.createElement("div");
    moveQuickLinkControls.classList.add("move-quick-link-controls");

    const moveQuickLinkUpButton = document.createElement("button");
    moveQuickLinkUpButton.classList.add("move-quick-link-up-button");
    moveQuickLinkUpButton.type = "button";
    moveQuickLinkUpButton.title = "Flytta up snabblänk";
    moveQuickLinkUpButton.addEventListener("click", moveQuickLinkUp);

    const moveQuickLinkUpButtonIcon = document.createElement("i");
    moveQuickLinkUpButtonIcon.classList.add("material-symbols-outlined");
    moveQuickLinkUpButtonIcon.textContent = "arrow_drop_up";
    moveQuickLinkUpButton.appendChild(moveQuickLinkUpButtonIcon);
    moveQuickLinkControls.appendChild(moveQuickLinkUpButton);

    const moveQuickLinkDownButton = document.createElement("button");
    moveQuickLinkDownButton.classList.add("move-quick-link-down-button");
    moveQuickLinkDownButton.type = "button";
    moveQuickLinkDownButton.title = "Flytta ner snabblänk";
    moveQuickLinkDownButton.addEventListener("click", moveQuickLinkDown);

    const moveQuickLinkDownButtonIcon = document.createElement("i");
    moveQuickLinkDownButtonIcon.classList.add("material-symbols-outlined");
    moveQuickLinkDownButtonIcon.textContent = "arrow_drop_down";
    moveQuickLinkDownButton.appendChild(moveQuickLinkDownButtonIcon);
    moveQuickLinkControls.appendChild(moveQuickLinkDownButton);

    quickLinkControls.appendChild(moveQuickLinkControls);
    quickLink.appendChild(quickLinkControls);

    linkList.appendChild(quickLink);
  });
};

loadQuickLinks();
