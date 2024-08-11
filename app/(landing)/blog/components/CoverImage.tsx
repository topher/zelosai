import Image from 'next/image'
import Link from 'next/link'

interface CoverImageProps {
  slug: string;
  title: string;
  image: any;
  priority: boolean;
  className?: string;
}

export default function CoverImage({
  slug,
  title,
  image,
  priority,
  className,
}: CoverImageProps) {
  const imageUrl = image?.url;

  return (
    <Link href={`/blog/posts/${slug}`} aria-label={title}>
      <Image
        src={imageUrl}
        alt={`Cover Image for ${title}`}
        className={className}  // Apply the className here
        priority={priority}
        layout="responsive"
        width={700}
        height={475}
      />
    </Link>
  )
}
