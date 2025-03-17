import Slider from '@/components/sliderComponet/SliderComponent';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Slider/>
      HomePage
    </div>
  );
};

export default HomePage;