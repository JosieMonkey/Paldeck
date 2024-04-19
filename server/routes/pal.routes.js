import { Router } from "express";
import * as palController from "../controllers/pal.controllers.js";
const router = Router();

// SHOULD WORK
router.route("/pals").post(PalController.addPal).get(PalController.getAllPals);
router
  .route("/pals/:id")
  .get(palController.getPalById)
  .put(palController.updatePalById)
  .delete(palController.deletePalById);

// NEEDS FINISHED
// working on making these work
router.route("/pals/:color").get(palController.getPalByColor);
router.route("/pals/:name").get(palController.getPalByName);
router.route("/pals/:type").get(palController.getPalByType);

export default router;
