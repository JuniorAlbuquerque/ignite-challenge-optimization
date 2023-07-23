import { useCallback, useEffect, useMemo, useState, lazy, FunctionComponent, Suspense } from 'react';

import { SideBar } from './components/SideBar';
import { ContentProps } from './components/Content';

const Content = lazy<FunctionComponent<ContentProps>>(() => import('./components/Content'))

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { moviesService } from './services/movies';
import { genresService } from './services/genres';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const selectedGenre = useMemo(() => {
    return genres.find(genre => genre.id === selectedGenreId)
  }, [genres, selectedGenreId])

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  const getGenres = useCallback(async () => {
    try {
      const response = await genresService.getGenres()
      setGenres(response)
    } catch (error) {
      console.warn(error)
    }
  }, [])

  const getMoviesByGenre = useCallback(async (genreId) => {
    try {
      const response = await moviesService.getMoviesByGenre(genreId)
      setMovies(response)
    } catch (error) {
      console.warn(error)
    }
  }, [])

  useEffect(() => {
    getGenres()
  }, []);

  useEffect(() => {
    getMoviesByGenre(selectedGenreId)
  }, [selectedGenreId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    <SideBar
      genres={genres}
      selectedGenreId={selectedGenreId}
      buttonClickCallback={handleClickButton}
    />

    <Suspense fallback={
      <div>Carregando filmes...</div>
    }>
      <Content
          selectedGenre={selectedGenre!}
          movies={movies}
      />
    </Suspense>
     
    </div>
  )
}