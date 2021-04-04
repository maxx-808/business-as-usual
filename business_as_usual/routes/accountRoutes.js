const router = require("express").Router();
const auth = require("../middleware/auth");
const { register, login } = require("../controllers/accountController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
