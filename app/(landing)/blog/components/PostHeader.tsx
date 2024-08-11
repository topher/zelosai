import Avatar from '@/app/(landing)/blog/components/AuthorAvatar'
import Date from '@/app/(landing)/blog/components/PostDate'
import PostTitle from '@/app/(landing)/blog/components/PostTitle'
import type { Post } from '@/lib/sanity.queries'

import React from 'react';
import CoverImage from '@/app/(landing)/blog/components/CoverImage';
import styles from './PostHeader.module.css';

export default function PostHeader(
  props: Pick<Post, 'title' | 'coverImage' | 'date' | 'author' | 'slug'>,
) {
  const { title, coverImage, date, author, slug } = props
  return (
    <div className="relative mb-8">
      <CoverImage title={title} image={coverImage} />
      <div className={`absolute inset-0 flex items-end ${styles.overlay}`}>
        <div className="p-6">
          <h1 className="text-4xl font-bold text-white">{title}</h1>
          <div className="text-sm text-gray-300 mt-2">
            <Date dateString={date} /> · {author && author.name}
          </div>
        </div>
      </div>
    </div>
  );
}

