import { readJSON } from '../utils.js';
import { randomUUID } from 'node:crypto';

const movies = readJSON('../movies.json');

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  };

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id);
    return movie;
  };

  static create = async ({ input }) => {
    const movie = {
      id: randomUUID(),
      ...input
    };
    movies.push(movie);
    return movie;
  };

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex === -1) return false;
    movies.splice(movieIndex, 1);
    return true;
  };

  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex((m) => m.id === id);
    if (movieIndex === -1) return false;
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    };
    return movies[movieIndex];
  };
}
