const express = require("express");
const FlatController = require("../controller/FlatController");

const router = express.Router();

router.get("/flats", FlatController.getAllFlats);
router.get("/flat/:id", FlatController.getFlatById);
router.get("/flat/block/:block_id", FlatController.getFlatsByBlockId);
router.get("/flats/filters", FlatController.getFlatsByDateAndRoom);
router.post("/flat", FlatController.postFlat);
router.put("/flat/:id", FlatController.updateFlat);
router.delete("/flat/:id", FlatController.deleteFlat);

module.exports = router;
