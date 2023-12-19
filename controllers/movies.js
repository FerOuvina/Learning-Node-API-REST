import { MovieModel } from '../models/movie.js';
import { validateMovie, validatePartialMovie } from '../schemes/movieSchema.js';

export class MovieController {
  static getAll = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
  };

  static getById = async (req, res) => {
    const { id } = req.params;
    const movie = await MovieModel.getById({ id });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    } else {
      return res.json(movie);
    }
  };

  static create = async (req, res) => {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await MovieModel.create({ input: result.data });
    res.status(201).json(newMovie);
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    const result = await MovieModel.delete({ id });
    return result
      ? res.status(204).end()
      : res.status(404).json({ message: 'Movie not found' }).end();
  };

  static update = async (req, res) => {
    const result = validatePartialMovie(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedMovie = await MovieModel.update({ id, input: result.data });
    return res.json(updatedMovie);
  };
}
