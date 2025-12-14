import Carousel from 'nuka-carousel/lib/carousel';
import arrowright from '../../assets/images/arrowright.svg';
import arrowleft from '../../assets/images/arrowleft.svg';

const Carousell = ({ children, classnames }: any) => {
  return (
    <Carousel
      className="z-1 overflow-auto"
      pauseOnHover={false}
      autoplay
      wrapAround
      defaultControlsConfig={{
        pagingDotsStyle: {
          padding: '10px',
        },
      }}
      renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
        <button
          onClick={previousSlide}
          disabled={previousDisabled}
          className="rounded-full mx-4 sm:mx-2 p-3 sm:mt-5 hover:bg-white hover:bg-opacity-50 hover:backdrop-blur-sm"
        >
          <img src={arrowleft} alt="" className=" sm:h-4 sm:w-4" />
        </button>
      )}
      renderCenterRightControls={({ nextDisabled, nextSlide }) => (
        <button
          className="rounded-full mx-4 sm:mx-2 p-3 sm:mt-5 hover:bg-white hover:bg-opacity-50 hover:backdrop-blur-sm"
          onClick={nextSlide}
          disabled={nextDisabled}
        >
          <img src={arrowright} className=" sm:h-4 sm:w-4" alt="" />
        </button>
      )}
    >
      {children}
    </Carousel>
  );
};

export default Carousell;
