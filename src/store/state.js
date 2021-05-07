export default () => ({
  theme: localStorage.getItem("theme"),
  user: {},
  isLogged: false,
  missions: {
    new: {},
    upcoming: {},
    pending: {},
    passed: {},
  },
  userDocuments: [],
  organizations: [],
});