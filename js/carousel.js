const CAROUSEL_CLASS = 'saga-carousel';
const CARDS_CLASS = 'saga-cards';
const LEFT_BUTTON_CLASS = 'saga-carousel-left';
const RIGHT_BUTTON_CLASS = 'saga-carousel-right';
const ACTIVE_CLASS = 'active';

function carousel() {
  const $carousels = Array
    .prototype
    .slice
    .call(document.getElementsByClassName(CAROUSEL_CLASS));

  if (!$carousels) {
    return null;
  }

  const events = ['load', 'resize'];
  const carousels = $carousels.map(($wrap) => {
    return {
      $wrap,
      $list: $wrap.querySelector(`.${CARDS_CLASS}`),
      $left: $wrap.querySelector(`.${LEFT_BUTTON_CLASS}`),
      $right: $wrap.querySelector(`.${RIGHT_BUTTON_CLASS}`)
    };
  });

  function justify() {
    carousels.forEach(({ $list }) => {
      if ($list.scrollWidth > $list.clientWidth) {
        $list.style.justifyContent = 'flex-start';
      } else {
        $list.style.justifyContent = 'center';
      }
    });
  }

  function buttons({ $list, $left, $right }) {
    if ($list.scrollLeft !== 0) {
      $left.classList.add(ACTIVE_CLASS);
    } else {
      $left.classList.remove(ACTIVE_CLASS);
    }

    if ($list.scrollWidth > $list.clientWidth && $list.clientWidth + $list.scrollLeft !== $list.scrollWidth) {
      $right.classList.add(ACTIVE_CLASS);
    } else {
      $right.classList.remove(ACTIVE_CLASS);
    }
  }

  function right({ $list }) {
    $list.scrollLeft += $list.scrollWidth/4;
  }

  function left({ $list }) {
    $list.scrollLeft -= $list.scrollWidth/4;
  }

  events.forEach((name) => window.addEventListener(name, justify));

  window.addEventListener('load', () => {
    carousels.forEach((carousel) => {
      const { $list, $right, $left } = carousel;
      const listener = () => buttons(carousel);

      $right.addEventListener('click', () => right(carousel));
      $left.addEventListener('click', () => left(carousel));
      $list.addEventListener('scroll', listener);
      window.addEventListener('resize', listener);
      listener();
    });
  });
}

carousel();
