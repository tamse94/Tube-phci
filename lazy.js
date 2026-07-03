document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img[data-src], img[data-srcset], source[data-srcset]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          requestAnimationFrame(() => {
            if (target.dataset.src) target.src = target.dataset.src;
            if (target.dataset.srcset) target.srcset = target.dataset.srcset;
            observer.unobserve(target);
          });
        }
      });
    }, {
      rootMargin: "0px 0px 200px 0px"
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    lazyImages.forEach(target => {
      if (target.dataset.src) target.src = target.dataset.src;
      if (target.dataset.srcset) target.srcset = target.dataset.srcset;
    });
  }
});
