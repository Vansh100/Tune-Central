import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { userPlaylist, getplaylistId, getPlaylistArtist, addSong } from "../controllers/playlist.controller.js";



const router = Router();
router.use(verifyJWT);

router.route("/create").post(userPlaylist)

router.route("/playlist/:playlistId").get(getplaylistId)

router.route("/artist/:artistId").get(getPlaylistArtist)

router.route("/add/song").post(addSong)

export default router;