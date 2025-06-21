
  const track = document.getElementById('marquee-track');
  const container = document.querySelector('.marquee-container');
  const image = track.querySelector('img');

  image.addEventListener('load', () => {
    const containerWidth = container.offsetWidth;
    const imageWidth = image.offsetWidth;
    const minTrackWidth = containerWidth * 2;

    let totalWidth = imageWidth;
    while (totalWidth < minTrackWidth) {
      const clone = image.cloneNode(true);
      track.appendChild(clone);
      totalWidth += imageWidth;
    }

    // Now that we have a long enough track, calculate duration
    const speed = 100; // pixels per second
    const duration = totalWidth / speed;
    track.style.animationDuration = `${duration}s`;
  });

// CAROUSEL
const carouselTrack = document.getElementById('carousel-track');
    const carouselPagination = document.getElementById('carousel-pagination');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let cards = [...carouselTrack.children];

    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    carouselTrack.appendChild(firstClone);
    carouselTrack.insertBefore(lastClone, cards[0]);
    cards = [...carouselTrack.children];

    let index = 1;
    let allowTransition = true;

    const updateCarousel = (skipTransition = false) => {
      const cardWidth = cards[0].offsetWidth;
      const visibleCards = window.innerWidth >= 992 ? 3 : 1;
      const offsetIndex = index - (visibleCards === 3 ? 1 : 0); // center active card
      const offset = cardWidth * offsetIndex;

      carouselTrack.style.transition = skipTransition ? 'none' : 'transform 0.5s ease-in-out';
      carouselTrack.style.transform = `translateX(-${offset}px)`;

      cards.forEach(card => card.classList.remove('active'));
      cards[index].classList.add('active');

      [...carouselPagination.children].forEach(dot => dot.classList.remove('active'));
      const visibleIndex = (index - 1 + (cards.length - 2)) % (cards.length - 2);
      if (carouselPagination.children[visibleIndex]) {
        carouselPagination.children[visibleIndex].classList.add('active');
      }
    };

    const jumpTo = (i) => {
      index = i + 1;
      updateCarousel();
    };

    const goNext = () => {
      if (!allowTransition) return;
      index++;
      updateCarousel();
    };

    const goPrev = () => {
      if (!allowTransition) return;
      index--;
      updateCarousel();
    };

    // Seamless loop handler
    carouselTrack.addEventListener('transitionend', () => {
      allowTransition = false;
      if (index === cards.length - 1) {
        index = 1;
        updateCarousel(true);
      }
      if (index === 0) {
        index = cards.length - 2;
        updateCarousel(true);
      }
      setTimeout(() => allowTransition = true, 20);
    });

    // Create dots
    for (let i = 0; i < cards.length - 2; i++) {
      const dot = document.createElement('span');
      dot.classList.add('carousel-dot');
      dot.addEventListener('click', () => jumpTo(i));
      carouselPagination.appendChild(dot);
    }

    nextBtn.addEventListener('click', goNext);
    prevBtn.addEventListener('click', goPrev);

    updateCarousel(true);
   