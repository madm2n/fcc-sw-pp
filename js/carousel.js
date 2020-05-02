const CAROUSEL_CLASS = 'saga-carousel';

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
      $list: $wrap.querySelector('*')
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

  events.forEach((name) => window.addEventListener(name, justify));
}

carousel();
