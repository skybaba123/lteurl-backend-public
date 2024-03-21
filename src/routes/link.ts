import { Router } from "express";
import createLink from "../controllers/link/createLink";
import getAllUsersLinksHandler from "../controllers/link/getAllUsersLink";
import userAuth from "../middlewares/userAuth";
import updateLinkHandler from "../controllers/link/updateLink";
import deleteLinkHandler from "../controllers/link/deleteLink";
import getAllLinksHandler from "../controllers/link/getAllLinks";
import getLinkPreviewHandler from "../controllers/link/getLinkPreview";

const router = Router();

router.post("/link/shorten", userAuth, createLink);

router.get("/links/user", userAuth, getAllUsersLinksHandler);

router.get("/links", userAuth, getAllLinksHandler);

router.post("/link/user/update", userAuth, updateLinkHandler);

router.post("/link/delete", userAuth, deleteLinkHandler);

router.post("/link/preview", getLinkPreviewHandler);

export default router;
