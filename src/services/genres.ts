import { api } from "./api";

export const genresService = {
  // @ts-ignore (add ignore because webpack config causes error using types in other files)
  async getGenres() {
    const { data } = await api.get('genres')
    return data
  }
}