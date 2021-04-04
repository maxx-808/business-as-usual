const router = require("express").Router();
// const auth = require("../middleware/auth");
const { register, login } = require("../controllers/accountController");

//routes for accounts add the /register for example to the url ending with
// /api/accounts to post them
router.post("/register", register);
router.post("/login", login);

module.exports = router;
