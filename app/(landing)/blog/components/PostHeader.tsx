import React from 'react';
import Avatar from '@/app/(landing)/blog/components/AuthorAvatar';
import Date from '@/app/(landing)/blog/components/PostDate';
import CoverImage from '@/app/(landing)/blog/components/CoverImage';
import type { Post } from '@/lib/sanity.queries';
import styles from './PostHeader.module.css';

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author } = props;

  return (
    <div className="relative">
      <CoverImage title={title} image={coverImage} slug={''} priority={false} />
      <div className={`absolute inset-0 flex items-end ${styles.overlay}`}>
        <div className="p-4 w-full max-w-full">
          <h1
            className="text-white font-bold"
            style={{
              fontSize: 'clamp(20px, 5vw, 64px)', // Smaller clamp range for better scaling on tiny screens
              lineHeight: '1.2',
              wordWrap: 'break-word',
              overflowWrap: 'break-word', // Ensure the text wraps properly
            }}
          >
            {title}
          </h1>
          <div className="text-xs sm:text-sm text-gray-300 mt-4">
            <Date dateString={date} /> · {author && author.name}
          </div>
        </div>
      </div>
    </div>
  );
}
