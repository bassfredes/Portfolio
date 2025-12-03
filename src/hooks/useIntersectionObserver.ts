import { useEffect, useState, RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = false,
  }: Args = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    if (freezeOnceVisible && isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsVisible(isIntersecting);
        if (isIntersecting && freezeOnceVisible) {
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, isVisible]);

  return isVisible;
}
