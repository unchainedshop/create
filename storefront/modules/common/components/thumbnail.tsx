import getMediaUrl from '../utils/getMediaUrl';

const Thumbnail = ({ media = [] }) => {
  return media.length ? (
    <img className="mr-2" width="32px" src={getMediaUrl({ media })} />
  ) : (
    <> </>
  );
};

export default Thumbnail;
