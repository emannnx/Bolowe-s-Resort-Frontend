import { useEffect } from 'react';
import wedding1 from '/src/assets/images/wedding1.png';
import wedding2 from '/src/assets/images/wedding2.png';
import wedding3 from '/src/assets/images/wedding3.png';
import wedding4 from '/src/assets/images/wedding4.png';
import Wedding from '../../assets/images/wedding.png';
import Carousell from './Carousell';

const Food = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div id="events" className="page">
      <Carousell>
        <div className="hero" style={{ backgroundImage: `url(${Wedding})` }}>
          FOOD
        </div>
        <div className="hero" style={{ backgroundImage: `url(${Wedding})` }}>
          DRINKS
        </div>
        <div className="hero" style={{ backgroundImage: `url(${Wedding})` }}>
          REFRESHMENTS
        </div>
      </Carousell>
      <div className="features">
        <img src={wedding1} alt="" className="feature-img" />{' '}
        <div className="feature-text">
          <h1>FOOD AND DRINKS</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste maxime
            atque quo molestias tempore est vitae quas, omnis tenetur velit
            accusamus voluptatibus ab asperiores, perspiciatis assumenda veniam
            facilis magni dolorum. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Unde nemo labore alias voluptate distinctio vitae
            quisquam dolore, est, exercitationem molestiae cupiditate sit
            voluptatum nulla dolores illum nobis. Tempore, temporibus soluta!
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Architecto, harum. Inventore odio ea tenetur architecto facilis
            ratione quae nesciunt quibusdam cupiditate voluptatem earum minus
            iure, dolores iusto est autem atque?
          </p>
        </div>
        <div className="feature-imgs">
          <img src={wedding2} alt="" />
          <img src={wedding3} alt="" />
          <img src={wedding4} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Food;
