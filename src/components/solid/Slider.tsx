/** @jsxImportSource solid-js */
import { createSignal, For } from 'solid-js';
import { TransitionGroup, Transition } from 'solid-transition-group';
import styles from './Slider.module.scss';
import './Slider.scss';

const Slider = (props: any) => {
  const {slides} = props;
  const [currentSlide, setCurrentSlide] = createSignal(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div class={styles.slider}>
      <button class={styles.arrowBtn} onClick={prevSlide}>Previous</button>
      <TransitionGroup>
        <For each={[currentSlide()]}>
          {(slideIndex) => (
            <Transition
              enterClass={styles['slide-enter']}
              enterActiveClass={styles['slide-enter-active']}
              exitClass={styles['slide-exit']}
              exitActiveClass={styles['slide-exit-active']}
            >
              <div class={styles.slide}>{slides[slideIndex]}</div>
            </Transition>
          )}
        </For>
      </TransitionGroup>
      <button class={styles.arrowBtn} onClick={nextSlide}>Next</button>
    </div>
  );
};

export default Slider;