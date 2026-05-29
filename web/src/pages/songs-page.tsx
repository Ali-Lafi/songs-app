import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSongs } from '../api/songs';
import { useDelaySearch } from '../hooks/search-delay';

export function SongsPage() {
  const [search, setSearch] = useState('');
  const delayedSearch = useDelaySearch(search, 300);

  const [pageNumber, setPageNumber] = useState(1);

  const songsQuery = useQuery({
    queryKey: ['songs', search, pageNumber],
    queryFn: () =>
      getSongs({
        pageNumber: pageNumber,
        pageSize: 10,
        search: delayedSearch,
      }),
  });

  return (
    <>
         <h1>Songs</h1>

      <input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPageNumber(1);
        }}
        placeholder="Search songs"
      ></input>

      {songsQuery.isPending && <div>Loading...</div>}
      {songsQuery.isError && <div>Error while loading songs</div>}

      {songsQuery.data?.items.map((song) => (
        <div key={song.id}>
          <h2>{song.name}</h2>
          <p>{song.singer}</p>
        </div>
      ))}

      <div>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((current) => current - 1)}
        >
          Previous
        </button>
       
        <span> Page {pageNumber} </span>
       
        <button
          disabled={
            songsQuery.data != null && songsQuery.data.items.length < 10
          }
          onClick={() => setPageNumber((current) => current + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
