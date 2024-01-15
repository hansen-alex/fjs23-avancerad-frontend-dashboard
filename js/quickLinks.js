import axios from "axios";

const quickLinksList = document.querySelector(".quick-links-list");
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
  //   {
  //     id: 4,
  //     title: "Twitch",
  //     url: "www.twitch.tv",
  //   },
];

// if (quickLinksList.childElementCount > 0) {
//     const moveQuickLinkUpButton = quickLinksList.firstChild.querySelector(
//       ".move-quick-link-up-button"
//     );

//     moveQuickLinkUpButton.disabled = true;
//     moveQuickLinkUpButton.classList.add("move-quick-link-button-disabled");

//     if (quickLinksList.childElementCount < 2) {
//       const moveQuickLinkDownButton = quickLinksList.firstChild.querySelector(
//         ".move-quick-link-down-button"
//       );

//       moveQuickLinkDownButton.disabled = true;
//       moveQuickLinkDownButton.classList.add("move-quick-link-button-disabled");
//     }
//   }

const removeQuickLink = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const quickLinkId = quickLinkObject.id;

  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  localStorage.setItem(
    "user-quick-links",
    JSON.stringify(
      userQuickLinks.filter((quickLink) => quickLink.id != quickLinkId)
    )
  );

  quickLinksList.removeChild(quickLinkObject);
};

const moveQuickLinkUp = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const previousSibling = quickLinkObject.previousSibling;
  if (previousSibling) {
    quickLinksList.insertBefore(quickLinkObject, previousSibling);

    //Update saved order
    const userQuickLinks =
      JSON.parse(localStorage.getItem("user-quick-links")) || [];

    const quickLinkObjectIndex = userQuickLinks.findIndex(
      (x) => x.id == quickLinkObject.id
    );
    const previousSiblingIndex = userQuickLinks.findIndex(
      (x) => x.id == previousSibling.id
    );

    const tempQuickLinkObject = userQuickLinks[quickLinkObjectIndex];
    userQuickLinks[quickLinkObjectIndex] = userQuickLinks[previousSiblingIndex];
    userQuickLinks[previousSiblingIndex] = tempQuickLinkObject;

    localStorage.setItem("user-quick-links", JSON.stringify(userQuickLinks));
  }
};

const moveQuickLinkDown = (event) => {
  event.preventDefault();

  const quickLinkObject = event.target.closest(".quick-link");
  const nextSibling = quickLinkObject.nextSibling;
  if (nextSibling) {
    quickLinksList.insertBefore(quickLinkObject, nextSibling.nextSibling);

    //Update saved order
    const userQuickLinks =
      JSON.parse(localStorage.getItem("user-quick-links")) || [];

    const quickLinkObjectIndex = userQuickLinks.findIndex(
      (x) => x.id == quickLinkObject.id
    );
    const nextSiblingIndex = userQuickLinks.findIndex(
      (x) => x.id == nextSibling.id
    );

    const tempQuickLinkObject = userQuickLinks[quickLinkObjectIndex];
    userQuickLinks[quickLinkObjectIndex] = userQuickLinks[nextSiblingIndex];
    userQuickLinks[nextSiblingIndex] = tempQuickLinkObject;

    localStorage.setItem("user-quick-links", JSON.stringify(userQuickLinks));
  }
};

const loadSingleQuickLink = (quickLinkData) => {
  const quickLink = document.createElement("a");
  quickLink.classList.add("quick-link");
  quickLink.href = `http://${quickLinkData.url}`;
  quickLink.target = "_blank";
  quickLink.id = `${quickLinkData.id}`;

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
  //   quickLinkTitle.textContent = `${quickLinkData.title}`;
  quickLinkTitle.textContent = `${quickLinkData.id}`;
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

  quickLinksList.appendChild(quickLink);
};

const loadQuickLinks = () => {
  quickLinksList.innerHTML = "";

  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  userQuickLinks.forEach((quickLinkData) => {
    loadSingleQuickLink(quickLinkData);
  });
};

loadQuickLinks();

const addQuickLink = () => {
  //get url from user
  //get title from user
  const newQuickLink = {
    id: Date.now(),
    title: "Google",
    url: "www.google.com",
  };

  //if pass
  const userQuickLinks =
    JSON.parse(localStorage.getItem("user-quick-links")) || [];

  localStorage.setItem(
    "user-quick-links",
    JSON.stringify([...userQuickLinks, newQuickLink])
  );

  loadSingleQuickLink(newQuickLink);
};
addQuickLinkButton.addEventListener("click", addQuickLink);
