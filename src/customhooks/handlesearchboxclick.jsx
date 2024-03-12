import { playlistfetch, song_album_fetch, albumsfetch } from './APIFetch';

const REPLACELIST = ['&quot;', '&amp;', '&#039;', '(', ')', '&', ';'];

const handlesearchboxclick = ({
  type,
  title,
  id,
  setbool,
  setnestsearchdata,
}) => {
  setbool(true);
  REPLACELIST.forEach(item => {
    title = title.replaceAll(item, '');
  });
  if (type === 'artist') {
    playlistfetch(id)
      .then(res => setnestsearchdata(res?.data?.data?.songs))
      .catch(err => console.log(err));
  }
  else if (type === 'album') {
    albumsfetch(id)
      .then(res => setnestsearchdata(res?.data?.data?.songs))
      .catch(err => console.log(err));
  }
  else if (type === 'song' || type === 'playlist') {
    song_album_fetch(title)
      .then(res => setnestsearchdata(res?.data?.data?.results))
      .catch(err => console.log(err));
  }
};

export default handlesearchboxclick;
