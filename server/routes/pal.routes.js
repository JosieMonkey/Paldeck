import { Router } from "express";
import * as palController from "../controllers/pal.controllers.js";
const router = Router();

router.route("/pals").post(palController.addPal).get(palController.getAllPals);
router
  .route("/pals/:id")
  .get(palController.getPalById)
  .put(palController.updatePalById)
  .delete(palController.deletePalById);
router.route("/pals/color/:color").get(palController.getPalsByColor);
router.route("/pals/name/:name").get(palController.getPalByName);
router.route("/pals/type/:type").get(palController.getPalsByType);

export default router;
