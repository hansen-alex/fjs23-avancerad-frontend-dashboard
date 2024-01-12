const dashboarUser = document.querySelector(".dashboard-user");

const getDashboardUsername = () => {
  return localStorage.getItem("username") || "User";
};

dashboarUser.addEventListener("focus", () => {
  dashboarUser.value = getDashboardUsername();
  dashboarUser.size = dashboarUser.value.length;
});

dashboarUser.addEventListener("focusout", () => {
  dashboarUser.value = getDashboardUsername() + "'s Dashboard";
  dashboarUser.size = dashboarUser.value.length;
});

dashboarUser.addEventListener("input", () => {
  dashboarUser.size = dashboarUser.value.length;
});

dashboarUser.addEventListener("change", () => {
  localStorage.setItem("username", dashboarUser.value);
  dashboarUser.size = dashboarUser.value.length + 12; //+ 's Dashboard
});

dashboarUser.value = getDashboardUsername() + "'s Dashboard";
dashboarUser.size = dashboarUser.value.length;
