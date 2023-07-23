import { api } from "./api";

export const moviesService = {
  // @ts-ignore (add ignore because webpack config causes error using types in other files)
  async getMoviesByGenre(genreId) {
    const { data } = await api.get(`movies/?Genre_id=${genreId}`);

    return data
  }
}