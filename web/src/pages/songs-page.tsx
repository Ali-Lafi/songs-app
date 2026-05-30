import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getSongs } from '../api/songs';
import { useDelaySearch } from '../hooks/search-delay';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SongsPage() {
  const [search, setSearch] = useState('');
  const delayedSearch = useDelaySearch(search, 300);

  const [pageNumber, setPageNumber] = useState(1);

  const songsQuery = useQuery({
    queryKey: ['songs', delayedSearch, pageNumber],
    queryFn: () =>
      getSongs({
        pageNumber: pageNumber,
        pageSize: 10,
        search: delayedSearch,
      }),
  });

  return (
    <>
       <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-3xl font-bold'>Songs</h1>
        <Input
        className='w-full sm:max-w-sm'
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPageNumber(1);
        }}
        placeholder="Search songs"
        />
       </div>
      

      {songsQuery.isPending && <div>Loading...</div>}
      {songsQuery.isError && <div>Error while loading songs</div>}

<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-5'>
{songsQuery.data?.items.map((song) => (
  <Card key={song.id} className='overflow-hidden'>
    {song.coverImageUrl && (
      <img src={song.coverImageUrl} alt={song.name} className='h-48 w-full object-cover'/>
    )}
    <CardContent className='space-y-2 p-4'>
<h2 className='text-lg font-semibold'>{song.name}</h2>
<p className='text-sm text-slate-600'>{song.singer}</p>
      {song.album && (<p className='text-sm text-slate-500'> {song.album}</p>)}
      {song.duration && (<p className='text-sm text-slate-500'> {song.duration}</p>)}
      
    </CardContent>
  </Card>
      ))}

</div>
      

      <div className='mt-8 flex items-center justify-center gap-4'>
        <Button
        variant='outline'
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((current) => current - 1)}
        >
          Previous
        </Button>
       
        <span className='text-sm text-slate-600'> Page {pageNumber} </span>
       
        <Button
        variant='outline'
          disabled={
            songsQuery.data != null && songsQuery.data.items.length < 10
          }
          onClick={() => setPageNumber((current) => current + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}
