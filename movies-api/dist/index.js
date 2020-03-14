"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * example api call:
 * https://api.themoviedb.org/3/movie/550?api_key=38faeec190c4e0b14ab8c5e9dfd1249f
 *
 *
 *
 */
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 4000;
const api = `https://api.themoviedb.org/3/movie/550?api_key=38faeec190c4e0b14ab8c5e9dfd1249f`;
const popular = `https://api.themoviedb.org/3/movie/popular?api_key=38faeec190c4e0b14ab8c5e9dfd1249f`;
app.use(cors_1.default());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {};
    try {
        const results = yield axios_1.default.get(popular);
        console.log(results);
        response = results.data;
    }
    catch (e) {
        response = { hasError: true };
        console.error(e);
    }
    //   res.send('YAY! It actually works!');
    res.send(response);
}));
app.get('/api/v1/popular', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {};
    try {
        const results = yield axios_1.default.get(popular);
        // console.log(results);
        response = results.data;
    }
    catch (e) {
        response = { hasError: true };
        console.error(e);
    }
    //   res.send('YAY! It actually works!');
    res.send(response);
}));
// /api/v1/movie?id=ID
// TODO: get similar: https://developers.themoviedb.org/3/movies/get-similar-movies
// TODO: get cast https://developers.themoviedb.org/3/movies/get-movie-credits
app.get('/api/v1/movie', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let response = {};
    try {
        const id = req.query.id;
        //   TODO: use a Promise.all here
        const results = yield Promise.all([
            axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}?api_key=38faeec190c4e0b14ab8c5e9dfd1249f`),
            axios_1.default.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=38faeec190c4e0b14ab8c5e9dfd1249f`),
        ]);
        // Map the responses
        response = Object.assign(Object.assign({}, results[0].data), results[1].data);
    }
    catch (e) {
        response = { hasError: true };
        console.error(e);
    }
    res.send(response);
}));
app.get('/api/v1/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    let response = {};
    try {
        const results = yield axios_1.default.get(`https://api.themoviedb.org/3/search/movie?api_key=38faeec190c4e0b14ab8c5e9dfd1249f&query=${query}`);
        console.log(results);
        response = results.data;
    }
    catch (e) {
        response = { hasError: true };
        console.error(e);
    }
    res.send(response);
}));
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map