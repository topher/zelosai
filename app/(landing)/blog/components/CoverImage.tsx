import cn from 'classnames';
import { urlForImage } from '@/lib/sanity.image';
import Image from 'next/image';
import Link from 'next/link';

interface CoverImageProps {
  title?: string;
  slug?: string;
  image: any;
  priority?: boolean;
  className?: string;
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority } = props;

  const image = source?.asset?._ref ? (
    <div className={cn('shadow-small')}>
      <Image
        className="h-auto w-full object-cover" // Ensure the image covers the available space without distorting
        width={2000}
        height={1000}
        alt={title}
        src={urlForImage(source).height(1000).width(2000).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div className="h-64 bg-gray-300 flex items-center justify-center">
      <span className="text-gray-500">No image available</span>
    </div>
  );

  return slug ? (
    <Link href={`/blog/posts/${slug}`} aria-label={title}>
      {image}
    </Link>
  ) : (
    image
  );
}
