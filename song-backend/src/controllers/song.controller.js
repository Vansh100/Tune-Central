import { Song } from "../models/song.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";


const songByName = asyncHandler(async (req, res) => {
    const {songName} = req.params; 
    const songs = await  Song.find({name: songName})
    return res.status(200).json({data: songs})
})

const songByArtist = asyncHandler(async (req, res) => {
    const { artistId } = req.params;
    const artist = await User.findById(artistId); // Use findById for a single document

    if (!artist) {
        throw new ApiError(301, "Artist does not exist");
    }

    const songs = await Song.find({ artist: artistId });
    return res.status(200).json({ data: songs });
});

export {
    songByName,
    songByArtist
};