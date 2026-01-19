const express = require("express");
const {
    createResource,
    getResources,
    deleteResource,
    updateResource,
} = require("../controllers/resourceController");

const router = express.Router();

router.post("/upload", createResource);
router.get("/", getResources);
router.delete("/:id", deleteResource);
router.put("/:id", updateResource);

module.exports = router;
