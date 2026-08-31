const router = require("express").Router();
const {AuthenticateShop} = require("../middleware/auth");
const { uploadImageMulter } = require("../middleware/multer");
const {uploadImages} = require("../controllers/imageRoutes");
const {CreateEvent , GetEvents , DeleteEvent , GetAllEvents} = require("../controllers/event.controllers");

// Create Event
router.post("/create-event" , AuthenticateShop , uploadImageMulter.array("images") , uploadImages , CreateEvent);

//Get all events
router.get("/get-all-events/:id" , AuthenticateShop , GetEvents);

//Get all events
router.get("/get-events" , GetAllEvents);

// Delete Event
router.delete("/delete-event/:id" , AuthenticateShop , DeleteEvent);
module.exports = router;