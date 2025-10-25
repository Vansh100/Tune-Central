import { Playlist } from "../models/playlist.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Song } from "../models/song.model.js";
import axios from "axios";


//creating playlist
const userPlaylist = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    const {name, thumbnail, songs} = req.body;
    if(!name || !thumbnail || !songs) {
        throw new ApiError(301, "Insufficient Data")
    }
    const playlistData = {
        name,
        thumbnail,
        songs,
        owner: currentUser._id,
        collaborators: []
    };

    const playlist = await Playlist.create(playlistData)
    return res.status(200).json(playlist)
})

//getting playlist by Id
const getplaylistId = asyncHandler(async (req, res) => {
    const playlistId = req.params.playlistId
    const playlist = await Playlist.findOne({_id: playlistId})
    if(!playlist) {
        throw new ApiError(302, "Invalid Id")
    }
    return res.status(200).json(playlist)
})

//getting playlist by artist
const getPlaylistArtist = asyncHandler(async (req, res) => {
    const artistId = req.params.artistId
    const artist = await User.findOne({_id: artistId})
    if(!artist) {
        throw new ApiError(301, "Invalid Artist Id")
    }
    const playlist = await Playlist.find({owner: artistId})
    return res.status(200).json({data: playlist})
})

//adding song to a playlist
const addSong = asyncHandler(async (req, res) => {
    const currentUser = req.user
    const {playlistId, songId} = req.body
    const playlist = await Playlist.findOne({_id: playlistId})
    if(!playlist) {
        throw new ApiError(304, "Playlist not exists")
    }
    //checking user owns or collaborator of playiist
    if (
        playlist.owner != currentUser._id ||
        !playlist.collaborators.includes(currentUser._id)
    ) { 
        throw new ApiError(400, "Not Authorised")
    }
    // checking song is valid or not
    const song = await Song.findOne({_id: songId})
    if(!song) {
        throw new ApiError(304, "Song does not exists")
    }
    //pushing song to playlist
    playlist.songs.push(songId)
    await playlist.save()
    return res.status(200).json(playlist)
})

const getResultMl = async (req,res,next) => {
    const {user_input,search_type} = req.body;
    const fetch = await axios.post("https://7f93-34-75-224-22.ngrok-free.app/predict",
        {
            body : {
                user_input,
                search_type
            }
        }
    )

    res = await fetch.data;
    console.log(res);

    return {
        status:200,
        msg : "successful",
        data : res
    };

}

export{
    userPlaylist,
    getplaylistId,
    getPlaylistArtist,
    addSong,
    getResultMl
}