import { APIFetch, playlistfetch } from './APIFetch';

const REPLACELIST = ['&quot;', '&amp;', '&#039;', '(', ')', '&', ';'];

const handlesearchboxclick = ({
  type,
  title,
  id,
  url,
  setbool,
  setnestsearchdata,
}) => {
  setbool(true);
  REPLACELIST.forEach(item => {
    title = title.replaceAll(item, '');
  });

  if (type === 'playlist' || type === 'album') {
    playlistfetch(
      type,
      type === 'playlist' ? 'id' : 'link',
      type === 'playlist' ? id : url
    )
      .then(res => {
        setnestsearchdata(res?.data?.data?.songs);
      })
      .catch(err => console.log(err));
  } else {
    APIFetch('songs', title, 30)
      .then(res => {
        setnestsearchdata(res.data?.data?.results);
      })
      .catch(err => console.log(err));
  }
};

export default handlesearchboxclick;
