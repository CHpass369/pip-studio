import React, { useEffect, useRef } from 'react';

interface InfiniteScrollProps {
  loading: boolean;
  on_load_more: () => void;
}

const InfiniteScroll = ({ loading, on_load_more }: InfiniteScrollProps) => {
  if (!on_load_more) {
    throw new Error('on_load_more is undefined');
  }

  const sentinel_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        on_load_more();
      }
    }, { threshold: 1 });

    const el = sentinel_ref.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [loading, on_load_more]);

  return (
    <div ref={sentinel_ref} className="infinite-scroll-sentinel">
      {loading && <p>Cargando...</p>}
    </div>
  );
};

export { InfiniteScroll };
